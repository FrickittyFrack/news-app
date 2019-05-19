var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
  scrapeNews: function(req, res) {

    return scrape()
      .then(function(article) {
        return db.Article.create(article);
      })
      .then(function(dbArticle) {
        if (dbArticle.length === 0) {
          res.json({
            message: "No articles"
          });
        }
        else {
          res.json({
            message: "Added " + dbArticle.length
          });
        }
      })
      .catch(function(err) {
        res.json({
          message: "Scrape complete!!"
        });
      });
  }
};
