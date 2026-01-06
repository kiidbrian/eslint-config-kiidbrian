import type {Linter} from "eslint";
import type {
  ConfigOptions,
  ESLintConfig,
  Preset,
  TestEnvironment,
} from "./types/index.js";

import baseConfig from "./configs/base.js";
import reactConfig from "./configs/react.js";
import nodeConfig from "./configs/node.js";
import strictConfig from "./configs/strict.js";
import minimalConfig from "./presets/minimal.js";

/**
 * Available preset configurations
 */
export type {Preset, TestEnvironment, ConfigOptions, ESLintConfig};

/**
 * Create a custom ESLint configuration
 *
 * @param options - Configuration options
 * @returns ESLint configuration array
 *
 * @example
 * ```ts
 * import { createConfig } from '@kiid_brian/eslint-config';
 *
 * export default createConfig({
 *   preset: 'react',
 *   environments: ['jest'],
 *   overrides: [
 *     {
 *       rules: {
 *         'no-console': 'off',
 *       },
 *     },
 *   ],
 * });
 * ```
 */
export function createConfig(options: ConfigOptions = {}): Linter.Config[] {
  const {
    preset = "react", // default preset
    overrides = [],
    environments = [],
  } = options;

  // Start with the chosen preset
  let config: Linter.Config[];
  switch (preset) {
    case "minimal":
      config = [...minimalConfig];
      break;
    case "base":
      config = [...baseConfig];
      break;
    case "react":
      config = [...reactConfig];
      break;
    case "node":
      config = [...nodeConfig];
      break;
    case "strict":
      config = [...strictConfig];
      break;
    default:
      throw new Error(
        `Unknown preset: ${preset}. Available presets: minimal, base, react, node, strict`
      );
  }

  // Add environment-specific configurations
  if (environments.includes("jest")) {
    config.push({
      files: ["**/*.test.{ts,tsx,js,jsx}", "**/*.spec.{ts,tsx,js,jsx}"],
      languageOptions: {
        globals: {
          ...require("globals").jest,
        },
      },
    });
  }

  if (environments.includes("vitest")) {
    config.push({
      files: ["**/*.test.{ts,tsx,js,jsx}", "**/*.spec.{ts,tsx,js,jsx}"],
      languageOptions: {
        globals: {
          ...require("globals").vitest,
        },
      },
    });
  }

  // Apply custom overrides
  if (overrides.length > 0) {
    config.push(...overrides);
  }

  return config;
}

/**
 * Minimal configuration with essential TypeScript support
 */
export const minimal: Linter.Config[] = minimalConfig;

/**
 * Base configuration with TypeScript support
 */
export const base: Linter.Config[] = baseConfig;

/**
 * React configuration with TypeScript and accessibility support
 */
export const react: Linter.Config[] = reactConfig;

/**
 * Node.js configuration optimized for server-side code
 */
export const node: Linter.Config[] = nodeConfig;

/**
 * Strict configuration with maximum code quality rules
 */
export const strict: Linter.Config[] = strictConfig;

/**
 * Default export - React configuration for backwards compatibility
 */
const defaultConfig: Linter.Config[] = reactConfig;

export default defaultConfig;
