import { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  verbose: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testMatch: ['**/?(*.)(test).ts?(x)'],
  testEnvironment: 'jsdom',
  preset: 'solid-jest/preset/browser',
};

export default config;
