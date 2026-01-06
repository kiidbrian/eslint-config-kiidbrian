# @kiid_brian/eslint-config

A comprehensive, flexible ESLint configuration package for TypeScript and JavaScript projects.

## Features

- ✅ **Multiple Presets**: Choose from base, React, Node.js, or strict configurations
- ✅ **TypeScript Support**: Full type-aware linting
- ✅ **React Support**: JSX, accessibility, and React-specific rules
- ✅ **Import Organization**: Automatic import sorting and validation
- ✅ **Security Rules**: Built-in security best practices
- ✅ **Documentation**: JSDoc requirements for better code documentation
- ✅ **Prettier Integration**: Seamless integration with Prettier
- ✅ **Customizable**: Easy configuration overrides and custom rules

## Installation

```bash
npm install --save-dev @kiid_brian/eslint-config
```

### Peer Dependencies

Install the required peer dependencies:

```bash
npm install --save-dev \
  @eslint/js \
  eslint \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-jsx-a11y \
  eslint-plugin-jsdoc \
  eslint-plugin-prettier \
  eslint-plugin-react \
  eslint-plugin-security \
  globals \
  prettier \
  typescript-eslint
```

## Usage

### Basic Usage (Default React Configuration)

```js
// eslint.config.js
import config from "@kiid_brian/eslint-config";

export default config;
```

### Using Specific Presets

```js
// eslint.config.js
import {react} from "@kiid_brian/eslint-config";

export default react;
```

Available presets:

- `react` (default) - Full React + TypeScript configuration
- `base` - Core TypeScript/JavaScript without React
- `node` - Optimized for Node.js applications
- `strict` - Maximum code quality with stricter rules

### Direct Import from Configs

```js
// eslint.config.js
import reactConfig from "@kiid_brian/eslint-config/configs/react.js";

export default reactConfig;
```

### Custom Configuration

```js
// eslint.config.js
import {createConfig} from "@kiid_brian/eslint-config";

export default createConfig({
  preset: "base",
  environments: ["jest"],
  overrides: [
    {
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
});
```

## Configuration Options

### `createConfig(options)`

#### `preset`

- Type: `string`
- Default: `"react"`
- Options: `"base" | "react" | "node" | "strict"`

Choose the base configuration preset.

#### `environments`

- Type: `string[]`
- Default: `[]`
- Options: `"jest" | "vitest"`

Add environment-specific globals and rules.

#### `overrides`

- Type: `Array<ESLintConfig>`
- Default: `[]`

Custom ESLint configuration objects to merge with the preset.

## Examples

### React Project

```js
// eslint.config.js
import config from "@kiid_brian/eslint-config";

export default config;
```

### Node.js API

```js
// eslint.config.js
import {node} from "@kiid_brian/eslint-config";

export default node;
```

### Strict Library Code

```js
// eslint.config.js
import {strict} from "@kiid_brian/eslint-config";

export default strict;
```

### Testing Environment

```js
// eslint.config.js
import {createConfig} from "@kiid_brian/eslint-config";

export default createConfig({
  preset: "react",
  environments: ["jest"],
});
```

### Custom Overrides

```js
// eslint.config.js
import {createConfig} from "@kiid_brian/eslint-config";

export default createConfig({
  preset: "base",
  overrides: [
    {
      rules: {
        "no-console": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
      },
    },
  ],
});
```

## Included Rules

### TypeScript

- Type-aware linting
- Strict type checking
- Unused variable detection
- Import/export validation

### React

- JSX best practices
- Accessibility (a11y) rules
- Component patterns
- Hook rules

### Code Quality

- Import organization
- Security vulnerabilities
- JSDoc documentation
- General best practices

### Environments

- Browser globals
- Node.js globals
- Jest/Vitest testing globals
- Config file allowances

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT © Brian Paintsil
