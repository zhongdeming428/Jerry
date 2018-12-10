/*
 * @Author: Russ Zhong 
 * @Date: 2018-12-10 20:08:25 
 * @Last Modified by: Russ Zhong
 * @Last Modified time: 2018-12-10 21:08:38
 */

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/Jerry.min.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    uglify()
  ]
};