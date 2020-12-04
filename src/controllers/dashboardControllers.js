const Property = require('../models/property');
module.exports.dashboardController = async (req, res, next) => {
    try {
        const properties = await Property.find({});
        res.status(200).json(properties);
    } catch (error) {
        res.status(400);
        next(error)
    }

}