const { Cab } = require("Models");
const { handleError } = require("Helper");

const addCab = async (req, res, next) => {
    try {
        const { driverName, thumbnailImage, description, carName, cabNumber } = req.body;

        const cab = new Cab({
            driverName,
            thumbnailImage: thumbnailImage || 'https://www.pinclipart.com/picdir/middle/147-1473538_prime-play-ola-cabs-clipart.png',
            description,
            carName,
            cabNumber,
        })
        await cab.save();
        res.status(200);
        return res.json({
            success: true,
            data: 'Cab Added',
        });

    } catch (err) {
        handleError(err);
        res.status(404);
        return res.json({
            success: false,
            error: err,
        });
    }


}

module.exports = {
    addCab,
};
