const express = require("express");
const nunjucks = require("nunjucks");
const { connectDb } = require("./db");
const scheduleService = require("./services/schedule.service");
const resultController = require("./controllers/result.controller");

const app = express();

nunjucks.configure('./src/views', {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");

app.use("/static", express.static("static"));

app.get("/", resultController.getResult);

app.post("/api/results/batch-import", resultController.batchImportResults);
app.get("/api/results", resultController.getResults);
app.get("/api/results/test", resultController.getTest);
app.get("/api/results/:date", resultController.getResultByDate);

// app.get("/api/users/:id/friends",  resultController.getResultByDate);

// app.get("/results/:date", resultController.getResultOld);

// app.get("/", (req, res) => {

//   const html = `<html>
//     <head>
//       <title>hello</title>
//     </head>
//     <body>
//       <h1>hello</h1>
//     </body>
//   </html>`

//   res.send(html)
// });

async function main() {
  await connectDb();

  scheduleService.start();

  const port = 8080;

  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });

  // await closeDbConnection();
}

main();
