import type {Linter} from "eslint";

/**
 * Available preset configurations
 */
export type Preset = "minimal" | "base" | "react" | "node" | "strict";

/**
 * Supported testing frameworks
 */
export type TestEnvironment = "jest" | "vitest";

/**
 * Configuration options for createConfig function
 */
export interface ConfigOptions {
  /** Base preset to use */
  preset?: Preset;
  /** Additional environments to support */
  environments?: TestEnvironment[];
  /** Custom ESLint configuration overrides */
  overrides?: Linter.Config[];
}

/**
 * ESLint configuration array type
 */
export type ESLintConfig = Linter.Config[];

/**
 * Create a custom ESLint configuration
 */
export function createConfig(options?: ConfigOptions): ESLintConfig {
  return [];
}

/**
 * Pre-configured ESLint configurations
 */
export declare const minimal: ESLintConfig;
export declare const base: ESLintConfig;
export declare const react: ESLintConfig;
export declare const node: ESLintConfig;
export declare const strict: ESLintConfig;

/**
 * Default export - React configuration
 */
declare const config: ESLintConfig;
export default config as ESLintConfig;
