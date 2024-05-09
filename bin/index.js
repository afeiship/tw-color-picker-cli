#!/usr/bin/env node

import { Command, Option } from 'commander';
import { createRequire } from 'module';
import { flatten } from 'safe-flat';
import clipboard from 'clipboardy';
import { deltaE, clearCache } from 'color-delta-e';
import colors from './colors.js';

const __dirname = new URL('../', import.meta.url).pathname;
const require = createRequire(__dirname);
const pkg = require('./package.json');
const program = new Command();
const twColors = flatten(colors, '-');

program.version(pkg.version);
program.addOption(new Option('-v, --verbose', 'show verbose log')).parse(process.argv);

/**
 * @help: tcpc -h
 * @description: tcpc -f
 */

class CliApp {
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
    const min = Math.min(...items.map((item) => item.deltaE || 100));
    return items.find((item) => item.deltaE === min);
  }

  run() {
    // const { input } = this.opts;
    const [input] = this.args;
    const results = [];
    for (let key in twColors) {
      const value = twColors[key];
      const res = deltaE(input, value);
      results.push({ key, value, deltaE: res });
    }
    const min = this.getMinItem(results);
    clipboard.writeSync(min.key);
    this.log('min: ', min);
    console.log('✅ Successfully copied to clipboard!');
  }
}

new CliApp().run();
