#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UIFetcherServer {
  private server: Server;
  private uiPath: string;

  constructor() {
    this.server = new Server(
      {
        name: 'mcp-ui-fetcher',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Resolve the UI package path
    this.uiPath = path.resolve(__dirname, '../../../packages/ui');

    this.setupHandlers();
  }

  private setupHandlers() {
    // Handle list_tools request
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'fetch_ui_structure',
          description: 'Fetch the directory structure of @packages/ui/',
          inputSchema: {
            type: 'object',
            properties: {
              includeNodeModules: {
                type: 'boolean',
                description: 'Whether to include node_modules in the listing',
                default: false,
              },
              maxDepth: {
                type: 'number',
                description: 'Maximum depth to traverse (default: 5)',
                default: 5,
              },
            },
          },
        },
        {
          name: 'read_ui_file',
          description: 'Read a specific file from @packages/ui/',
          inputSchema: {
            type: 'object',
            properties: {
              filePath: {
                type: 'string',
                description: 'Path relative to @packages/ui/',
              },
            },
            required: ['filePath'],
          },
        },
      ],
    }));

    // Handle call_tool request
    this.server.setRequestHandler(CallToolRequestSchema, async request => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'fetch_ui_structure':
          return await this.fetchUIStructure(
            (args as any)?.includeNodeModules ?? false,
            (args as any)?.maxDepth ?? 5
          );
        case 'read_ui_file':
          if (!(args as any)?.filePath) {
            throw new Error('filePath is required');
          }
          return await this.readUIFile((args as any).filePath as string);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async fetchUIStructure(includeNodeModules: boolean, maxDepth: number) {
    try {
      const structure = await this.getDirectoryStructure(
        this.uiPath,
        '',
        0,
        maxDepth,
        includeNodeModules
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(structure, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error fetching UI structure: ${error}`,
          },
        ],
        isError: true,
      };
    }
  }

  private async getDirectoryStructure(
    dirPath: string,
    relativePath: string,
    depth: number,
    maxDepth: number,
    includeNodeModules: boolean
  ): Promise<any> {
    if (depth > maxDepth) {
      return null;
    }

    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const structure: any = {};

    for (const entry of entries) {
      // Skip node_modules unless explicitly included
      if (!includeNodeModules && entry.name === 'node_modules') {
        continue;
      }

      const fullPath = path.join(dirPath, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        const subStructure = await this.getDirectoryStructure(
          fullPath,
          relPath,
          depth + 1,
          maxDepth,
          includeNodeModules
        );
        if (subStructure !== null) {
          structure[entry.name] = {
            type: 'directory',
            path: relPath,
            children: subStructure,
          };
        }
      } else {
        structure[entry.name] = {
          type: 'file',
          path: relPath,
          size: (await fs.stat(fullPath)).size,
        };
      }
    }

    return structure;
  }

  private async readUIFile(filePath: string) {
    try {
      const fullPath = path.join(this.uiPath, filePath);

      // Security check: ensure the path is within the UI directory
      const resolvedPath = path.resolve(fullPath);
      const resolvedUIPath = path.resolve(this.uiPath);

      if (!resolvedPath.startsWith(resolvedUIPath)) {
        throw new Error('Access denied: Path is outside UI directory');
      }

      const content = await fs.readFile(fullPath, 'utf-8');

      return {
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error reading file: ${error}`,
          },
        ],
        isError: true,
      };
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP UI Fetcher Server running on stdio');
  }
}

// Start the server
const server = new UIFetcherServer();
server.run().catch(console.error);
