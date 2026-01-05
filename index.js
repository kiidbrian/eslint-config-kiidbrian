import baseConfig from "./configs/base.js";
import reactConfig from "./configs/react.js";
import nodeConfig from "./configs/node.js";
import strictConfig from "./configs/strict.js";

// Default export (backwards compatibility with original eslint.config.js)
export default reactConfig;

// Named exports for different presets
export const base = baseConfig;
export const react = reactConfig;
export const node = nodeConfig;
export const strict = strictConfig;

// Function to create custom config with overrides
export function createConfig(options = {}) {
  const {
    preset = "react", // default preset
    overrides = [],
    environments = [],
    typescript = true,
    react: enableReact = true,
    accessibility = true,
    security = true,
    jsdoc = true,
    prettier = true,
  } = options;

  // Start with the chosen preset
  let config;
  switch (preset) {
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
        `Unknown preset: ${preset}. Available presets: base, react, node, strict`
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

// Re-export individual configs for advanced usage
export {baseConfig, reactConfig, nodeConfig, strictConfig};
