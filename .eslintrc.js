module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard",'plugin:vue/base'],
  plugins: ["vue"],
  parserOptions: {
    parser: "babel-eslint",sourceType: "module"
  },
  // add your custom rules here
  rules: {
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "camelcase":"off"
  }
}
