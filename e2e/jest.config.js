/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: "..",
  testMatch: ["<rootDir>/e2e/**/*.test.js"],
  testTimeout: 120000,
  maxWorkers: 1,
  testSequencer: require.resolve("./testSequencer.js"),
  globalSetup: "detox/runners/jest/globalSetup",
  globalTeardown: "detox/runners/jest/globalTeardown",
  reporters: [
    "detox/runners/jest/reporter",
    "default", // Shows test results in terminal
    [
      "jest-html-reporter",
      {
        pageTitle: "Detox Test Report",
        outputPath: "test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
  testEnvironment: "detox/runners/jest/testEnvironment",
  verbose: true,
};
