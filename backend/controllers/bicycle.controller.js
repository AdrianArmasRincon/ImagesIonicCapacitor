const db = require("../models");
const Bicycle = db.bicycles;
const Op = db.Sequelize.Op;

// Create and Save a new Bicycle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Bicycle
  const bicycle = {
    brand: req.body.brand,
    model: req.body.model,
    filename: req.file ? req.file.filename : ""
  }

  // Save Bicycle in the database
  Bicycle.create(bicycle).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the bicycle"
    })
  });
};

// Retrieve all Bicycles from the database.
exports.findAll = (req, res) => {
  Bicycle.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Bicycles"
    })
  })
};

// Find a single Bicycle with an id
exports.findOne = (req, res) => {
  const bicycleId = req.params.id;

  Bicycle.findById(bicycleId, (err, bicycle) => {
    if (err) {
      return res.status(500).send({
        message: "Error retrieving bicycle with id " + bicycleId
      });
    }

    if (!bicycle) {
      return res.status(404).send({
        message: "Bicycle not found with id " + bicycleId
      });
    }

    res.send(bicycle);
  });
}

// Update a Bicycle by the id in the request
exports.update = (req, res) => {


};

// Delete a Bicycle with the specified id in the request
exports.delete = (req, res) => {
  const bicycleId = req.params.id;
  //Bicycle.findOneAndRemove({
  Bicycle.destroy({
    where: {id: bicycleId}
  })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: "Bicycle not found with id " + bicycleId
        });
      }
      res.send({
        message: "Bicycle deleted successfully"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting bicycle with id " + bicycleId
      });
    });
};