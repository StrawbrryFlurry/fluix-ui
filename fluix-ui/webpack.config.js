module.exports = {
  resolve: {
    extensions: [".svg"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
            options: {
              removeSVGTagAttrs: false,
            },
          },
        ],
      },
    ],
  },
};
