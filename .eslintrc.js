// Legacy ESLint config for linting this package itself
module.exports = {
  extends: ["./index.js"],
  parserOptions: {
    project: false, // Disable type checking for the config package itself
  },
  rules: {
    "jsdoc/require-description": "off", // Less strict for config files
    "jsdoc/require-param": "off",
    "jsdoc/require-returns": "off",
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
