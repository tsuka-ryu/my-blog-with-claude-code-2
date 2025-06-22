#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

async function runLighthousePRComment() {
  console.log('🔍 Lighthouse監査結果をPRコメントに投稿します...\n');

  try {
    // Lighthouse CIを実行
    const lhciOutput = execSync(
      'npx @lhci/cli autorun --collect.settings.chromeFlags="--no-sandbox"',
      { 
        encoding: 'utf8',
        env: {
          ...process.env,
          LHCI_GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        }
      }
    );

    console.log('Lighthouse CI出力:');
    console.log(lhciOutput);

    // GitHub Actionsの場合、追加のコメント処理
    if (process.env.GITHUB_ACTIONS) {
      // レポートURLを抽出
      const reportUrlMatch = lhciOutput.match(/Open the report at (https?:\/\/[^\s]+)/);
      if (reportUrlMatch) {
        const reportUrl = reportUrlMatch[1];
        
        // GitHub Actionsの出力として設定
        console.log(`::set-output name=lighthouse-report-url::${reportUrl}`);
        
        // ワークフローサマリーに追加
        const summary = `
## 🔍 Lighthouse アクセシビリティ監査結果

📊 [詳細レポートを確認する](${reportUrl})

このPRのアクセシビリティスコアと詳細な監査結果を確認できます。
        `;
        
        if (process.env.GITHUB_STEP_SUMMARY) {
          fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
        }
      }
    }

  } catch (error) {
    console.error('❌ Lighthouse CI実行中にエラーが発生:', error.message);
    
    // GitHub Actionsの場合、エラー詳細を出力
    if (process.env.GITHUB_ACTIONS) {
      const errorSummary = `
## ❌ Lighthouse アクセシビリティ監査失敗

アクセシビリティスコアが基準値（90%）を下回ったか、監査中にエラーが発生しました。

**エラー詳細:**
\`\`\`
${error.message}
\`\`\`

アクセシビリティの問題を修正してから再度お試しください。
      `;
      
      if (process.env.GITHUB_STEP_SUMMARY) {
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, errorSummary);
      }
    }
    
    process.exit(1);
  }
}

if (require.main === module) {
  runLighthousePRComment();
}

module.exports = { runLighthousePRComment };