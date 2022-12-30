const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.join(" ")}`;

module.exports = {
  "**/*.(ts|tsx)": () => "npx tsc --noEmit",
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, buildPrettierCommand],
  "**/*.(md|json)": (filenames) => `prettier --write ${filenames.join(" ")}`,
};
