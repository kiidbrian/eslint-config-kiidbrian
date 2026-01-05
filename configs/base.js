import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import security from "eslint-plugin-security";

export default [
  // Base ESLint recommended rules
  js.configs.recommended,

  // TypeScript recommended rules
  ...ts.configs.recommended,
  ...ts.configs.recommendedTypeChecked,

  // Import rules
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  // Security rules
  security.configs.recommended,

  // JSDoc rules
  jsdoc.configs["flat/recommended"],

  // Custom configuration
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true, // Enable type-aware rules
      },
    },
    plugins: {
      import: importPlugin,
      jsdoc,
      security,
    },
    rules: {
      // Console and debugging
      "no-console": "warn",
      "no-debugger": "error",

      // TypeScript specific rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",
      "@typescript-eslint/no-var-requires": "error",

      // Import rules
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-absolute-path": "error",
      "import/no-dynamic-require": "warn",
      "import/no-webpack-loader-syntax": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {order: "asc", caseInsensitive: true},
        },
      ],

      // Security rules
      "security/detect-object-injection": "warn",
      "security/detect-non-literal-regexp": "warn",
      "security/detect-unsafe-regex": "error",

      // JSDoc rules
      "jsdoc/require-description": "warn",
      "jsdoc/check-values": "warn",
      "jsdoc/check-param-names": "error",
      "jsdoc/check-tag-names": "error",
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "warn",

      // General code quality
      "no-unused-vars": "off", // Use @typescript-eslint/no-unused-vars instead
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-duplicate-imports": "error",
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },

  // Environment-specific configurations
  {
    files: ["**/*.test.{ts,tsx,js,jsx}", "**/*.spec.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Allow any in tests
      "jsdoc/require-description": "off", // Less strict JSDoc in tests
      "jsdoc/require-param": "off",
      "jsdoc/require-returns": "off",
    },
  },

  {
    files: [
      "**/*.config.{ts,js}",
      "**/vite.config.{ts,js}",
      "**/vitest.config.{ts,js}",
    ],
    rules: {
      "no-console": "off", // Allow console in config files
      "@typescript-eslint/no-var-requires": "off", // Allow require in configs
    },
  },

  // Ignore patterns
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "*.min.js",
      "*.bundle.js",
      "coverage/**",
      ".next/**",
      ".nuxt/**",
      ".output/**",
      ".vercel/**",
      ".netlify/**",
      "public/**",
      "**/*.d.ts",
    ],
  },

  // Prettier must be last to override conflicting rules
  prettierRecommended,
];
