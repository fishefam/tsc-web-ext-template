import CopyPlugin from 'copy-webpack-plugin';
import { readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Replicate __dirname in CommonJS
const __dirname = dirname(fileURLToPath(import.meta.url));

const browser = process.env.BROWSER;
const workdir = `./src/${browser}`;
const files = readdirSync(resolve(__dirname, workdir));

const extensions = ['ts', 'json'];
const { ts, json } = groupByExtensions(files, extensions);

const entryKeys = ts.map((t) => getFileName(t, 'ts'));
const copyPattern = json.map((t) => ({ from: resolve(__dirname, workdir, t), to: '' }));
const aliases = [['utils', 'src/utils']];

/** @type {import('webpack').Configuration} */
export default {
  mode: 'production',
  entry: Object.fromEntries(entryKeys.map((k, i) => [k, resolve(__dirname, workdir, ts[i])])),
  output: { filename: '[name].js', path: __dirname + '/dist', clean: true },
  plugins: [new CopyPlugin({ patterns: copyPattern })],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: { jsc: { parser: { syntax: 'typescript' } }, sourceMaps: true, minify: true },
        },
      },
    ],
  },
  resolve: {
    alias: Object.fromEntries(aliases.map((a) => [a[0], resolve(__dirname, a[1])])),
    extensions: ['.js', '.ts'],
  },
};

function groupByExtension(files, extension) {
  return files.filter((f) => new RegExp(`.${extension}$`).test(f));
}

function groupByExtensions(files, extensions) {
  return Object.fromEntries(extensions.map((e) => [e, groupByExtension(files, e)]));
}

function getFileName(file, extension) {
  return file.replace(new RegExp(`.${extension}$`), '');
}
