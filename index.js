const { testCases } = require("./tests-doc/fitnessApp.js");
const { exec } = require("child_process");
const fs = require("fs");
const archiver = require("archiver");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(
  "/data",
  express.static(path.join(__dirname, "playwright-report", "data"))
);

app.listen(process.env.PORT, () => {
  console.log(`App running on :${process.env.PORT}`);
});

app.get("/", (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "Playwright server is up and running",
    status: 200,
  });
});

app.get("/html", (req, res) => {
  const filePath = path.join(__dirname, "playwright-report", "index.html");
  res.sendFile(filePath);
});

// Define the endpoint for zipping and downloading the 'test-results' folder
app.get("/result", (req, res) => {
  const folderPath = path.join(__dirname, "playwright-report");
  const zipFilePath = path.join(__dirname, "playwright-report.zip");

  // Create a zip archive
  const archive = archiver("zip", { zlib: { level: 9 } });
  const output = fs.createWriteStream(zipFilePath);

  output.on("close", () => {
    // Send the zip file as a response
    res.download(zipFilePath, "playwright-report.zip", (err) => {
      if (err) {
        res.status(500).send("Error downloading the zip file");
      }

      // Cleanup: Remove the temporary zip file after download
      fs.unlinkSync(zipFilePath);
    });
  });

  archive.pipe(output);
  archive.directory(folderPath, false);
  archive.finalize();
});

const runTests = async (req, res) => {
  const { TEST, ...otherProperties } = req.body;
  const env = Object.assign({}, process.env, {
    TEST,
    ...otherProperties,
  });
  try {
    const child = exec("npx playwright test", { env });
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
          console.log(errorMessage);
          // reject(errorMessage);
        }
        resolve();
      });
    });
    const summary = fs.readFileSync(
      path.join(__dirname, "summary.txt"),
      "utf8"
    );
    res.status(200).json({ data: output, summary, date: new Date() });
  } catch (e) {
    res.status(404).json({ error: e });
  }
};

app.post("/playground", async (req, res) => {
  await runTests(req, res);
});

app.get("/tests", (req, res) => {
  const testsFolder = path.join(__dirname, "tests");

  // Read all files in the tests folder
  fs.readdir(testsFolder, (err, files) => {
    if (err) {
      console.error("Error reading tests folder:", err);
      return res.status(500).send("Internal Server Error");
    }

    const tests = [];

    // Iterate through each file
    files.forEach((file) => {
      if (file.includes(".spec")) {
        const filePath = path.join(testsFolder, file);

        // Read the content of each file
        const fileContent = fs.readFileSync(filePath, "utf-8");

        // Use a regular expression to find test titles
        const titleMatches = fileContent.match(/test\(["'](.*?)["']/g);

        if (titleMatches) {
          titleMatches.forEach((match) => {
            // Extract the test title and add it to the arra
            const title = match
              .replace(/test\(["']|(.*?)["']\)/g, "$1")
              .replace(/['"]/g, "");
            const testCase = testCases.find(
              (testCase) => testCase.title === title
            );
            if (testCase) {
              tests.push(testCase);
            } else {
              tests.push({
                title,
                steps: undefined,
                expectedOutput: undefined,
              });
            }
          });
        }
      }
    });

    res.status(200).json({ tests });
  });
});
