// Controller for our notes
// ========================
var db = require("../models");

module.exports = {
  // Find one note
  find: function(req, res) {
    db.Comment.find({ _headlineId: req.params.id }).then(function(dbComment) {
      res.json(dbComment);
    });
  },
  // Create a new note
  create: function(req, res) {
    db.Note.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  },
  // Delete a note with a given id
  delete: function(req, res) {
    db.Note.remove({ _id: req.params.id }).then(function(dbComment) {
      res.json(dbComment);
    });
  }
};
