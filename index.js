const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const servicesRouter = require("./routers/servicesRouter");
const homecareRouter = require("./routers/homecareRouter");
const cors = require("cors");
const path = require("path");

const app = express();

// app.use("/images", express.static("images"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);

app.use("/services", servicesRouter);
app.use("/home-care-resources", homecareRouter);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Living Spring" });
});

let pages = ["about-us", "apply-now", "contact-us"];

for (let page of pages) {
  app.get(`/${page}`, (req, res) => {
    res.render(page, { title: page.replace(/-/g, " ") });
  });
}

// app.get("/about-us", (req, res) => {
//   res.render("about");
// });

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/", (req, res) => {
//   res.render("index");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
