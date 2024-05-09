#!/usr/bin/env node

import { Command, Option } from 'commander';
import { createRequire } from 'module';
import path from 'path';
import { flatten } from 'safe-flat';
import clipboard from 'clipboardy';
import resolveConfig from 'tailwindcss/resolveConfig.js';

import { deltaE } from 'color-delta-e';
import colors from './colors.js';
import '@jswork/next-deep-assign';

const __dirname = new URL('../', import.meta.url).pathname;
const require = createRequire(__dirname);
const pkg = require('./package.json');
const program = new Command();

program.version(pkg.version);
program
  .addOption(new Option('-v, --verbose', 'show verbose log'))
  .addOption(new Option('-t, --is-text', 'create text color css class'))
  .addOption(new Option('-b, --is-background', 'create background color css class'))
  .addOption(new Option('-c, --config <string>', 'path to tailwind.config.js'))
  .parse(process.argv);

/**
 * @help: tcpc -h
 * @description: tcpc -f
 */

class CliApp {
  get prefix() {
    const { isText, isBackground } = this.opts;
    if (isText) return `text-`;
    if (isBackground) return `bg-`;
    return '';
  }

  constructor() {
    this.args = program.args;
    this.opts = program.opts();
  }

  log(...args) {
    const { verbose } = this.opts;
    if (verbose) console.log('📗', ...args);
  }

  /**
   * @private get min item from array of objects.
   * @param items
   * @returns {*}
   */
  getMinItem(items) {
    const min = Math.min(...items.map((item) => item.deltaE));
    return items.find((item) => item.deltaE === min);
  }

  getAppColors() {
    const { config } = this.opts;
    const cwd = process.cwd();
    const fullpath = path.resolve(cwd, config || './tailwind.config.js');
    const tailwindConfig = require(fullpath);
    const fullConfig = resolveConfig(tailwindConfig);
    return fullConfig.theme.colors;
  }

  run() {
    const { isText, isBackground, config } = this.opts;
    const [input] = this.args;
    const results = [];
    const appColors = this.getAppColors();
    const currentColors = flatten(nx.deepAssign({}, colors, appColors), '-');
    for (let key in currentColors) {
      const value = currentColors[key];
      const res = deltaE(input, value);
      results.push({ key, value, deltaE: res });
    }
    const min = this.getMinItem(results);
    const cpTarget = `${this.prefix}${min.key}`;
    clipboard.writeSync(cpTarget);
    this.log('min: ', min);
    console.log('✅ Successfully copied to clipboard!');
  }
}

new CliApp().run();
