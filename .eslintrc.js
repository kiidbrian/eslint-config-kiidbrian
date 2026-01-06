// ESLint config for linting this package itself
module.exports = {
  extends: ["./dist/presets/minimal.js"],
  parserOptions: {
    project: false, // Disable type checking for the config package itself
  },
  rules: {
    // Allow console in package development
    "no-console": "off",
  },
  ignorePatterns: ["node_modules/", "dist/", "*.test.ts", "*.spec.ts"],
};
