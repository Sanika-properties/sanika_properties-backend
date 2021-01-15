require('dotenv').config();
const jwt = require('jsonwebtoken');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapBoxToken });

const User = require('../models/user');


const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        res.status(401);
        const error = new Error('unauthorized 🚫')
        next(error);
    }
    next();
}

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        const error = new Error('unauthorized 🚫')
        next(error);
    }
    next();
}



const checkTokenAndSetUser = (req, res, next) => {
    const authHeader = req.get('authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, function (err, payload) {
            if (err) {
                res.status(401);
                next(err);
            } else {
                req.user = payload.data;
            }
        });
    }
    next();
}


const searchAndFilterProperty = async (req, res, next) => {
    const queryKeys = Object.keys(req.query);

    if(queryKeys.length) {
        const dbQueries = [];
        let { minPrice, maxPrice , location, distance, purpose } = req.query;

        if (location) {
            let coordinates;
            try {
                if(typeof JSON.parse(location) === 'number') {
                    throw new Error;
                }
                location = JSON.parse(location);
                coordinates = location;
            } catch(err) {
                const response = await geocodingClient
                    .forwardGeocode({
                        query: location,
                        limit: 1
                    })
                    .send();
                coordinates = response.body.features[0].geometry.coordinates;
            }
            let maxDistance = distance || 25; // distance coming is in km
            maxDistance *= 1000;
            dbQueries.push({
                location: {
                    $near: {
                        $geometry: {
                           type: "Point" ,
                           coordinates: coordinates //lng lat
                        },
                        $maxDistance: maxDistance
                      }
                }
            });
        }

        if (purpose) {
            dbQueries.push({ purpose: purpose });
        }
        if (minPrice) {
            dbQueries.push({ price: { $gte: minPrice } });
        }
        if(maxPrice){
            dbQueries.push({ price: { $lte: maxPrice } });
        }

        req.query = dbQueries.length ? {$and: dbQueries} : {};
    }

    next();
}


module.exports = {
    isLoggedIn,
    checkTokenAndSetUser,
    isAdmin,
    searchAndFilterProperty
}