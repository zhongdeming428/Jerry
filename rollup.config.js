/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-10 20:08:25 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-11 19:45:48
 */

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";

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
    commonjs(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    terser()
  ]
};