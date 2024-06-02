module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  globals: {
    process: true,
    FormData: true,
    fetch: true,
    console: true,
    alert:true ,
    document: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: [
    "react"
  ],
  rules: {

    "no-undef": "off"
  }
};