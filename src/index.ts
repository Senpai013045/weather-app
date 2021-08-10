import express from "express";
import path from "path";

const publicDirectory = path.join(__dirname, "../public");

const app = express();

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "subham",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "this is about page",
    name: "subham",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is some help text",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "Rain",
    location: "Nepal",
  });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
