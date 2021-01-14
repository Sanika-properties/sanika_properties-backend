const mongoose = require('mongoose');


const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });

const Property = require('./../models/property');

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
        if (!req.files.length) throw new Error('image is required');
        const newProperty = new Property({...req.body, locationName: req.body.location});
        newProperty.images = req.files.map(f => {
            return ({ url: f.path, filename: f.filename });
        });
        newProperty.author = req.user._id;


        let response = await geocodingClient
		  .forwardGeocode({
		    query: req.body.location,
		    limit: 1
		  })
		  .send();
		newProperty.location = response.body.features[0].geometry;
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
            const { location } = req.body;
            const property = await Property.findByIdAndUpdate(id, {...req.body, locationName: location});
            // if (!newlyUpdatedProperty) {
            //     throw new Error('wrong or invalid id🤦‍♂️');
            // }
            if(req.files) {
                // upload images url inserted in Db
                const imgs = req.files.map(f => {
                    return ({ url: f.path, filename: f.filename });
                });
                property.images.push(...imgs);
            }
            

            // need to check if location was updated
            if(req.body.location !== property.locationName) {
                let response = await geocodingClient
                .forwardGeocode({
                    query: location,
                    limit: 1
                })
                .send();
                property.location = response.body.features[0].geometry;
            }
            

            await property.save();
            res.status(201).json(property);
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


module.exports.search = async (req, res, next) => {
    try {
        console.log(req.body);
        // const query = {
        //     type:{},
        //     location:{},
        //     propertyType:{},
        //     price:{},
        // }
       

        const properties = await Property.find(query);
        res.json(properties)
    } catch (error) {
        next(error);
    }
}
