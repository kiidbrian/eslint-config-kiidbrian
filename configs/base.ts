import type {Linter} from "eslint";
import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";

// Conditionally load optional plugins
let prettierRecommended: any = {};
let importPlugin: any = {flatConfigs: {recommended: {}, typescript: {}}};
let jsdoc: any = {configs: {"flat/recommended": {}}};
let security: any = {configs: {recommended: {}}};

try {
  prettierRecommended = require("eslint-plugin-prettier/recommended");
} catch {
  // Prettier not available, skip prettier rules
}

try {
  importPlugin = require("eslint-plugin-import");
} catch {
  // Import plugin not available, skip import rules
}

try {
  jsdoc = require("eslint-plugin-jsdoc");
} catch {
  // JSDoc plugin not available, skip jsdoc rules
}

try {
  security = require("eslint-plugin-security");
} catch {
  // Security plugin not available, skip security rules
}

const baseConfig: Linter.Config[] = [
  // Base ESLint recommended rules
  js.configs.recommended,

  // TypeScript recommended rules - comprehensive setup
  ...ts.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...ts.configs.stylisticTypeChecked,

  // Conditionally include import rules
  ...(importPlugin.flatConfigs?.recommended
    ? [importPlugin.flatConfigs.recommended]
    : []),
  ...(importPlugin.flatConfigs?.typescript
    ? [importPlugin.flatConfigs.typescript]
    : []),

  // Conditionally include security rules
  ...(security.configs?.recommended ? [security.configs.recommended] : []),

  // Conditionally include JSDoc rules
  ...(jsdoc.configs?.["flat/recommended"]
    ? [jsdoc.configs["flat/recommended"]]
    : []),

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
        projectFolderIgnoreList: ["**/node_modules/**"],
        tsconfigRootDir: process.cwd(),
      },
    },
    // TypeScript-specific file patterns
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    plugins: {
      import: importPlugin,
      jsdoc,
      security,
    },
    rules: {
      // Console and debugging
      "no-console": "warn",
      "no-debugger": "error",

      // TypeScript specific rules - comprehensive
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

      // Enhanced TypeScript rules
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {prefer: "type-imports"},
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/consistent-type-exports": "error",

      // Conditionally include import rules
      ...(importPlugin.flatConfigs?.recommended
        ? {
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
          }
        : {}),

      // Conditionally include security rules
      ...(security.configs?.recommended
        ? {
            "security/detect-object-injection": "warn",
            "security/detect-non-literal-regexp": "warn",
            "security/detect-unsafe-regex": "error",
          }
        : {}),

      // Conditionally include JSDoc rules
      ...(jsdoc.configs?.["flat/recommended"]
        ? {
            "jsdoc/require-description": "warn",
            "jsdoc/check-values": "warn",
            "jsdoc/check-param-names": "error",
            "jsdoc/check-tag-names": "error",
            "jsdoc/require-param": "warn",
            "jsdoc/require-returns": "warn",
          }
        : {}),

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
      ...(importPlugin.flatConfigs?.recommended
        ? {
            "import/resolver": {
              typescript: true,
              node: true,
            },
          }
        : {}),
    },
  },

  // JavaScript files (non-TypeScript) - less strict
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    rules: {
      "@typescript-eslint/no-var-requires": "off", // Allow require in JS files
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // TypeScript declaration files
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Allow unused vars in .d.ts
      "no-unused-vars": "off",
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
      "@typescript-eslint/no-non-null-assertion": "off", // Allow ! in tests
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

export default baseConfig;
