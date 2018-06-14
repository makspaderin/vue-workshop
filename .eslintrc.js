module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint"
  },
  env: {
    browser: true,
    "node": true
  },
  extends: ["airbnb-base", "prettier", "prettier/standard", "plugin:vue/recommended"],
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": ["error", { "singleQuote": true }],
    "quotes": [2, "single", "avoid-escape"],
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    "import/prefer-default-export": false,
    "import/no-named-default": false
  }
};
