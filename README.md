# eslint-plugin-builtin-compat

Checks built-in objects compatibility

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
    "plugins": [
        "builtin-compat"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "builtin-compat/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





