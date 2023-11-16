// const runTests = async (req, res) => {
//   try {
//     const child = exec("npx playwright test");
//     let output = ""; // Variable to store the command output
//     let errorOutput = "";

//     // Attach event listeners to capture the output
//     child.stdout?.on("data", (data) => {
//       output += data;
//     });

//     child.stderr?.on("data", (data) => {
//       errorOutput += data; // Log any errors to the console
//     });

//     // Promise that resolves when the command completes
//     await new Promise((resolve, reject) => {
//       child.on("close", (code) => {
//         if (code !== 0) {
//           const errorMessage = `playwright return code is non-zero: ${code}\n${errorOutput}`;
//           reject(errorMessage);
//         } else {
//           resolve();
//         }
//       });
//     });

//     res.json({ data: output });
//   } catch (e) {
//     res.json({ error: e });
//   }
// };

// app.get("/tests", (req, res) => {
//   runTests(req, res);
// });

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

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
