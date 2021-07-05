"use strict";
// 版本校验
// 控制台输出不同颜色
const chalk = require("chalk");
// 版本判断
const semver = require("semver");
const packageConfig = require("../package.json");
// 执行Unix系统命令
const shell = require("shelljs");

function exec(cmd) {
  // 转换成字符串
  return require("child_process")
    .execSync(cmd)
    .toString()
    .trim();
}

const versionRequirements = [
  {
    name: "node", // 确定node版本
    currentVersion: semver.clean(process.version),
    // 校验怕package.json中的规则
    versionRequirement: packageConfig.engines.node
  }
];
// 校验npm
if (shell.which("npm")) {
  versionRequirements.push({
    name: "npm",
    currentVersion: exec("npm --version"),
    versionRequirement: packageConfig.engines.npm
  });
}

module.exports = function() {
  const warnings = [];

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i];

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        mod.name +
          ": " +
          chalk.red(mod.currentVersion) +
          " should be " +
          chalk.green(mod.versionRequirement)
      );
    }
  }

  if (warnings.length) {
    console.log("");
    console.log(
      chalk.yellow(
        "To use this template, you must update following to modules:"
      )
    );
    console.log();

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      console.log("  " + warning);
    }

    console.log();
    process.exit(1);
  }
};
