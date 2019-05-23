require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride = require("method-override");
var passport = require('passport');
var passportConfig = require('./config/passport')
var application = require('./routes/application');
// var routes = require("./routes");

SALT_WORK_FACTOR = 12;


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(session({
  secret: 'veggieswapkeepsyoulogged',
  resave: false,
  saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride("_method"));
// Handlebars
require('./public/js/handlebars.js')(exphbs);
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/authenticate")(app);
require("./routes/api-user")(app);
require("./routes/public-routes")(app);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
