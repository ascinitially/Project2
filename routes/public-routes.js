var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

//deliver static files without running into issues with routing

  app.get("/assets", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/styles/styles.css"));
  });

  app.get("/scripts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/js/scripts.js"));
  });
  
};