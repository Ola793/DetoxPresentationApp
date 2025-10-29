module.exports = {
  root: true,
  extends: ["@react-native", "plugin:prettier/recommended"],
  plugins: ["prettier", "detox"],
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["e2e/**/*.js"],
      env: {
        "detox/detox": true,
        jest: true,
      },
    },
  ],
};
