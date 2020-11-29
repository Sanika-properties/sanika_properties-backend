const mongoose = require('mongoose');
const Property = require('./../models/property');
const { property } = require('./../validations');

module.exports.getAll = async (req, res, next) => {
    const properties = await Property.find({});
    res.status(200).json(properties);
}

module.exports.getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (mongoose.Types.ObjectId.isValid(id)) {
            const property = await Property.findById(id);
            if (!property) {
                res.status(204);
                throw new Error('not found💀');
            }
            res.status(200).json(property);
        } else {
            res.status(422);
            throw new Error('wrong id💀');
        }

    } catch (error) {
        next(error);
    }
}


module.exports.create = async (req, res, next) => {
    try {
        const newProperty = new Property(req.body);
        newProperty.images = req.files.map(f => {
            return ({ url: f.path, filename: f.filename });
        });
        newProperty.author = req.user._id;
        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(400);
        next(err);
    }
}


module.exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (mongoose.Types.ObjectId.isValid(id)) {
            const { title, imageUrl, description } = req.body;
            const newlyUpdatedProperty = await Property.findByIdAndUpdate(id, { title, imageUrl, description }, { new: true });
            if (!newlyUpdatedProperty) {
                throw new Error('wrong or invalid id🤦‍♂️');
            }
            newlyUpdatedProperty.images = req.files.map(f => {
                return ({ url: f.path, filename: f.filename });
            });
            await newlyUpdatedProperty.save();
            res.status(201).json(newlyUpdatedProperty);
        } else {
            res.status(422);
            throw new Error('invalid id💀');
        }
    } catch (error) {
        next(error);
    }
}


// deleting property
module.exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (mongoose.Types.ObjectId.isValid(id)) {
            const property = await Property.findByIdAndDelete(id);
            if (!property) {
                throw new Error('wrong or invalid id🤦‍♂️');
            }
            res.status(200).json(property);
        } else {
            res.status(422);
            throw new Error('invalid id💀');
        }

    } catch (error) {
        next(error);
    }
}

