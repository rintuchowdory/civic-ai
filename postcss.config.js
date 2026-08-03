const removeUnsupportedWebkitTextSizeAdjust = {
  postcssPlugin: "remove-unsupported-webkit-text-size-adjust",
  Declaration(decl) {
    if (decl.prop === "-webkit-text-size-adjust") {
      decl.remove();
    }
  },
};

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "remove-unsupported-webkit-text-size-adjust": removeUnsupportedWebkitTextSizeAdjust,
  },
};
