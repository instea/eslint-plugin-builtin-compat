# eslint-plugin-builtin-compat

Checks built-in methods compatibility.
It uses [browser-compat-data](https://github.com/mdn/browser-compat-data) to determine incompatible method calls.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-builtin-compat`:

```
$ npm install eslint-plugin-builtin-compat --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-builtin-compat` globally.

## Usage

Add `builtin-compat` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["builtin-compat"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "builtin-compat/no-incompatible-builtins": 2
  }
}
```

You can ignore certain built-ins, usually after adding a polyfill:

```json
{
  "settings": {
    "builtin-compat-ignore": ["assign", "startsWith"]
  }
}
```

Configure supported browsers in `package.json` (see [browserslist](https://github.com/browserslist/browserslist)):

```json
{
  "browserslist": ["last 1 versions", "not ie <= 8"]
}
```

## Contributing

Contributions are welcome! Just open an issues with any idea or pull-request if it is no-brainer. Make sure all tests and linting rules pass.
