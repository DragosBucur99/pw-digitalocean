const { exec } = require("child_process");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const runTests = async (req, res) => {
  try {
    const child = exec("npx playwright test");
    let output = ""; // Variable to store the command output
    let errorOutput = "";

    // Attach event listeners to capture the output
    child.stdout?.on("data", (data) => {
      output += data;
    });

    child.stderr?.on("data", (data) => {
      errorOutput += data; // Log any errors to the console
    });

    // Promise that resolves when the command completes
    await new Promise((resolve, reject) => {
      child.on("close", (code) => {
        if (code !== 0) {
          const errorMessage = `playwright return code is non-zero: ${code}\n${errorOutput}`;
          reject(errorMessage);
        } else {
          resolve();
        }
      });
    });

    res.send(output);
  } catch (e) {
    res.send(e + output);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/tests", (req, res) => {
  runTests(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
