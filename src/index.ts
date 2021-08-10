import express from "express";
import path from "path";
import hbs from "hbs";

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Subham",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Subham",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is some help text",
    title: "Help page",
    name: "Subham",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    res.status(400);
    return res.send({
      error: "Address is required in the query",
    });
  }

  res.send({
    forecast: "Rain",
    location: address,
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Subham",
    title: "Not found",
    message: "Help article not found",
  });
}),
  app.get("*", (req, res) => {
    res.render("404", {
      name: "Subham",
      title: "404",
      message: "Page not found",
    });
  });

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
