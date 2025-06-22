#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

async function runLighthouseAccessibility() {
  console.log('🔍 Lighthouseアクセシビリティ監査を開始します...\n');

  const lhciPath = path.resolve(__dirname, '../node_modules/.bin/lhci');

  return new Promise((resolve, reject) => {
    const lhci = spawn(lhciPath, ['autorun'], {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        LHCI_BUILD_CONTEXT__CURRENT_BRANCH: process.env.GITHUB_HEAD_REF || 'local',
      },
    });

    lhci.on('close', (code) => {
      if (code === 0) {
        console.log('\n✅ アクセシビリティ監査が正常に完了しました！');
        resolve();
      } else {
        console.error(`\n❌ アクセシビリティ監査が失敗しました。終了コード: ${code}`);
        reject(new Error(`Lighthouse CI exited with code ${code}`));
      }
    });

    lhci.on('error', (error) => {
      console.error('\n❌ Lighthouse CI実行中にエラーが発生しました:', error);
      reject(error);
    });
  });
}

async function main() {
  try {
    await runLighthouseAccessibility();
    process.exit(0);
  } catch (error) {
    console.error('\nエラー:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runLighthouseAccessibility };