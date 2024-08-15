module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "vue"],
  testMatch: ["**/tests/unit/**/*.spec.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};
