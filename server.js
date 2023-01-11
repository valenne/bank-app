/**
 * Required External Modules
 */
const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

/**
 * App Variables
 */

const { port } = require("./config");

/**
 *  Importing Routes
 */
const routesApp = require("./routes/routes.js");

/**
 *  App Configuration
 */

// cookieParser
app.use(cookieParser());

// body-parser -> From Express 4.16+
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Public Folder
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/public/assets"));
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    extname: ".hbs",
    helpers: {
      inc: (value, _) => {
        return parseInt(value) + 1;
      },
    },
  })
);

app.set("view engine", "hbs");

//helper function what compare two values and return the partial element

Handlebars.registerHelper("equal", function (lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlebars Helper equal needs 2 parameters");
  if (lvalue != rvalue) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

/**
 * Routes Definitions
 */

/* ----- Front get Page ----- */
app.get("/", (_, res) => {
  res.render("index", {
    title: `Index`,
    styles: `styles`,
  });
});

/* ----- routes importing from: routes/routes ----- */
app.use(routesApp);

/* ----- Terms Route ----- */
app.get("/terms", (req, res) => {
  res.render("error/error_501", {
    title: `Error 501`,
    code: 501,
    styles: `styles`,
  });
});

/* ----- Deploy error page ----- */

app.get("*", (req, res) => {
  res.render("error/error_404", {
    title: `Error 404`,
    code: 404,
    styles: `styles`,
  });
});

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Server is up on port http://localhost:${port}/`);
});
