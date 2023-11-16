import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { exec, execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifestPath = resolve(__dirname, 'dist/manifest.json');

try {
  const { manifest_version } = JSON.parse(readFileSync(manifestPath, { encoding: 'utf8' }));
  if (manifest_version === 3) throw new Error('Unsupported Manifest Version');
  executeScript();
} catch {
  execSync('cross-env BROWSER=firefox webpack');
  executeScript();
}

function executeScript() {
  execSync('cross-env BROWSER=firefox webpack');
  exec('cross-env BROWSER=firefox webpack --watch');
  console.log(`
This script only supports Firefox extension with manifest version 2
Running web extension from ${__dirname}${/\//g.test(__dirname) ? '/' : '\\'}dist
Use --verbose or --devtools to see logging
Installed ${__dirname}${/\//g.test(__dirname) ? '/' : '\\'}dist as a temporary add-on
The extension will reload if any source file changes
Press R to reload (or close browser to quit)
      `);
  execSync('web-ext run --source-dir ./dist/');
  process.exit();
}
