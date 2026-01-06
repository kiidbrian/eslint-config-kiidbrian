import type {Linter} from "eslint";
import react from "eslint-plugin-react";
import baseConfig from "./base.js";

// Conditionally load JSX-A11y plugin
let jsxA11y: any = {flatConfigs: {recommended: {}}};

try {
  jsxA11y = require("eslint-plugin-jsx-a11y");
} catch {
  // JSX-A11y plugin not available, skip accessibility rules
}

const reactConfig: Linter.Config[] = [
  // Start with base configuration
  ...baseConfig,

  // React recommended rules
  ...(react.configs.flat?.recommended ? [react.configs.flat.recommended] : []),
  ...(react.configs.flat?.["jsx-runtime"]
    ? [react.configs.flat["jsx-runtime"]]
    : []),

  // Conditionally include accessibility rules
  ...(jsxA11y.flatConfigs?.recommended
    ? [jsxA11y.flatConfigs.recommended]
    : []),

  // React-specific configuration
  {
    plugins: {
      ...(jsxA11y.flatConfigs?.recommended ? {"jsx-a11y": jsxA11y} : {}),
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
  } as Linter.Config,
];

export default reactConfig;
