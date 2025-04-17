export default {
  // or module.exports = { ... } if using CommonJS

  // allow ESM packages like react-router-dom
  transformIgnorePatterns: [
    "node_modules/(?!(react-router-dom|@mui|@mui/material|@emotion|lodash-es)/)",
  ],

  // support .ts and .tsx
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],

  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
};
