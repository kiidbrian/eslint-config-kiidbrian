# @kiid_brian/eslint-config

A comprehensive, flexible ESLint configuration package for TypeScript and JavaScript projects.

## Features

- ✅ **TypeScript First**: Comprehensive type-aware linting out of the box
- ✅ **Full Type Safety**: Complete TypeScript definitions included
- ✅ **Flexible Presets**: Choose from minimal, base, React, Node.js, or strict configurations
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

## Preset Options

Choose the right preset for your project needs:

### Minimal Preset

**For basic TypeScript projects** - Only requires essential dependencies

```bash
npm install --save-dev @kiid_brian/eslint-config
```

```js
// eslint.config.js
import {minimal} from "@kiid_brian/eslint-config";

export default minimal;
```

**Required peer dependencies:**

- `@eslint/js`, `eslint`, `globals`, `typescript-eslint`

### Standard Presets (Base, React, Node, Strict)

**For full-featured projects** - Includes all optional plugins when available

```bash
npm install --save-dev @kiid_brian/eslint-config \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-prettier \
  # ... other optional plugins
```

```js
// eslint.config.js
import {react} from "@kiid_brian/eslint-config";

export default react;
```

## TypeScript Support

This config is **TypeScript-first** with comprehensive type safety:

- ✅ **Full type-aware linting** with project analysis
- ✅ **Modern TypeScript rules** (consistent types, optional chaining, nullish coalescing)
- ✅ **TypeScript definitions included** - no additional setup required
- ✅ **Stylistic consistency** (type imports, interface vs type, const assertions)
- ✅ **Enhanced type checking** (no unnecessary assertions, inferrable types)
- ✅ **Comprehensive file support** (`.ts`, `.tsx`, `.mts`, `.cts`, `.d.ts`)
- ✅ **Smart unused variable detection** with TypeScript patterns
- ✅ **Type-safe configuration API** with IntelliSense support

**Note**: Make sure you have a `tsconfig.json` in your project root for optimal type checking.

### Peer Dependencies

#### Required (for all presets):

```bash
npm install --save-dev \
  @eslint/js \
  eslint \
  globals \
  typescript-eslint
```

#### Optional (enhance functionality when installed):

```bash
npm install --save-dev \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-jsdoc \
  eslint-plugin-jsx-a11y \
  eslint-plugin-prettier \
  eslint-plugin-react \
  eslint-plugin-security \
  prettier
```

**Note**: Optional plugins are loaded conditionally - your config works without them, but provides enhanced rules when they're available.

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
- Options: `"minimal" | "base" | "react" | "node" | "strict"`

Choose the base configuration preset:

- `"minimal"`: Essential TypeScript rules only
- `"base"`: Full TypeScript with optional plugins
- `"react"`: React + TypeScript + accessibility
- `"node"`: Node.js optimized configuration
- `"strict"`: Maximum code quality rules

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

```ts
// eslint.config.ts (TypeScript)
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

```js
// eslint.config.js (JavaScript)
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

- **Full type-aware linting** with project analysis
- **Modern TypeScript rules** (consistent types, optional chaining, nullish coalescing)
- **Stylistic consistency** (type imports, interface vs type, const assertions)
- **Enhanced type checking** (no unnecessary assertions, inferrable types)
- **Comprehensive file support** (`.ts`, `.tsx`, `.mts`, `.cts`, `.d.ts`)
- **Smart unused variable detection** with TypeScript patterns

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
