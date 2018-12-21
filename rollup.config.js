/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-10 20:08:25 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-21 16:36:54
 */

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/Jerry.min.js',
    format: 'umd',
    name: 'Jerry'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    json(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ["env", {
          "targets": {
            "ie": 8
          },
          modules: false
        }]
      ],
      plugins: [
        'external-helpers'
      ]
    }),
    terser({
      ie8: true,
      ecma: 5
    })
  ]
};