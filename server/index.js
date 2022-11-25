const express = require("express");
const app = express();
const port = 3000;
const game = require("./routes/routes");
const { exec } = require("child_process");


let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "*");
    next();
  }


app.use(allowCrossDomain);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static('./public/')); 
app.use('/images', express.static('images'));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/service", game);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});