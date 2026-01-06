import type {Linter} from "eslint";
import globals from "globals";
import baseConfig from "./base.js";

const nodeConfig: Linter.Config[] = [
  ...baseConfig,

  // Node.js-specific configuration
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
        // Remove browser globals that aren't needed in Node.js
      },
    },
    rules: {
      // Allow console in Node.js applications
      "no-console": "off",
    },
  },
];

export default nodeConfig;
