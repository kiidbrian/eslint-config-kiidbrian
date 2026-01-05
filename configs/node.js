import globals from "globals";
import baseConfig from "./base.js";

export default [
  ...baseConfig,

  // Node.js-specific configuration
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "no-console": "off",

      // Node.js specific rules can be added here
      // For example, you might want to enforce certain patterns
    },
  },
];
