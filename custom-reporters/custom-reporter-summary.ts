import * as fs from "fs";
import * as path from "path";

export default class MyReporter {
  outputFile: string;
  failedTests: number;
  passedTests: number;
  retries: number;
  constructor(options) {
    this.outputFile = options.outputFile;
    this.failedTests = 0;
    this.passedTests = 0;
    this.retries = 0;
  }

  onBegin(config, suite) {
    this.retries = config.projects.find(
      (project) => project.retries >= 0
    ).retries;
  }

  onTestEnd(test, result) {
    if (
      (result.status === "failed" || result.status === "timedOut") &&
      result.retry === this.retries
    )
      this.failedTests++;
    if (result.status === "passed") this.passedTests++;
  }

  onEnd() {
    outputReport(
      `${this.passedTests} OK, ${this.failedTests} failed`,
      this.outputFile
    );
  }
}

function outputReport(reportString, outputFile = "summary.txt") {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, reportString);
}
