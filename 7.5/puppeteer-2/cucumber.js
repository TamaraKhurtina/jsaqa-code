module.exports = {
  default: {
    require: [
      "features/support/**/*.js",
      "features/step_definitions/**/*.js"
    ],
    format: ["progress-bar"],
    paths: ["features/**/*.feature"]
  }
};