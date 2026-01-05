import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import baseConfig from "./base.js";

export default [
  ...baseConfig,

  // React recommended rules
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],

  // Accessibility rules
  jsxA11y.flatConfigs.recommended,

  // React-specific configuration
  {
    plugins: {
      "jsx-a11y": jsxA11y,
      react,
    },
    rules: {
      // React specific rules
      "react/prop-types": "off", // TypeScript handles prop validation
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/jsx-uses-vars": "error",
      "react/jsx-key": ["error", {checkFragmentShorthand: true}],
      "react/jsx-no-useless-fragment": "error",
      "react/self-closing-comp": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
