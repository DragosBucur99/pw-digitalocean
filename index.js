// const { exec } = require("child_process");
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = process.env.PORT || 3000;

// // Replace these functions with your actual token generation and verification logic.
// // function generateToken() {
// //   return "test";
// // }

// function verifyToken(token) {
//   return token === "testToken";
// }

// // Middleware to check for a valid token
// function requireToken(req, res, next) {
//   const token = req.headers["authorization"];

//   if (!token || !verifyToken(token)) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   next();
// }

// app.use(cors());

// // app.get("/api/test", (req, res) => {
// //   res.json({ message: "This is the /api/test endpoint" });
// // });

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

// // app.post("/tests", requireToken, (req, res) => {
// //   runTests(req, res);
// // });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const express = require("express");
const app = express();
const port = 3000;

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

    res.json({ data: output });
  } catch (e) {
    res.json({ error: e });
  }
};

app.get("/", (req, res) => {
  res.json({ data: "Hello world" });
});

app.post("/tests", (req, res) => {
  runTests(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
