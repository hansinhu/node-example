/*
 * @file typescript 模块路径
 * 必须使用相对路径导入本模块
 */
import { register } from 'tsconfig-paths'
import { compilerOptions as options } from '../tsconfig.json'
import 'reflect-metadata'

// 解决node搜索路径问题
const registerPath = register({
  baseUrl: options.baseUrl,
  paths: options.paths,
})

export default registerPath
