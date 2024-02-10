const db = require("../models");

module.exports = {
    findAll: (req, res) => {
        db.Station.find()
            .then(response => res.json(response))
            .catch(err => res.status(422).json(err));
    },
    findOne: (req, res) => {
        db.Station.findById(req.params.id)
            .then(response => res.json(response))
            .catch(err => res.send(422).json(err));
    },
    create: (req, res) => {
        db.Station.create(req.body)
            .then(response => {
                db.User.findOneAndUpdate({ _id: req.params.id }, {$push: {station: response._id}}, {new: true})
                    .then(response => {
                        console.log(response);
                        res.json(response);
                    })
                    .catch(err => res.status(422).json(err));
            })
    },
    remove: (req, res) => {
        db.Station.deleteOne({ _id: req.params.stationId })
            .then(response => {
                db.User.findOneAndUpdate({ _id: req.params.id }, {$pull: {station: req.params.stationId}})
                    .then(response => {
                        res.json(response);
                    });
            }).catch(err => res.status(422).json(err));
    }
}