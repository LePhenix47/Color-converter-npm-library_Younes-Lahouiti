const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
  optimization: {},
  resolve: {
    extensions: [".ts", ".js"],
  },
};
