const { Hospital, Doctor, Category } = require('Models');
const { handleError } = require('Helper');

const METERS_PER_MILES = 1609.34;

const getHospitalListing = async (req, res, next) => {
  const hospitals = await Hospital.find();
  res.json({
    data: hospitals,
    success: true
  });
};

const deleteHospitalListing = async (req, res, next) => {
  // const { id } = req.params;
  // const { hospitalId } = props;

  await Hospital.findOneAndDelete({ _id: req.params.id }, (err, Hospital) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!Hospital) {
      return res
        .status(404)
        .json({ success: false, error: `Hospital not detail` });
    }

    return res.status(200).json({ success: true, data: movie });
  }).catch(err => console.log(err));
};

const getHospitalById = async (req, res, next) => {
  const { hospitalId } = req.params;
  try {
    const hospital = await Hospital.findOne({ _id: hospitalId });
    const doctors = await Doctor.find({ hospitalId });
    const categories = await Category.find({
      _id: { $in: hospital.category || [] }
    });

    res.json({
      data: {
        ...hospital.toObject(),
        category: categories,
        doctors
      },
      success: true
    });
  } catch (err) {
    res.json({
      success: false
    });
    handleError(err);
  }
};

const getNearyByHospitals = async (req, res, next) => {
  try {
    const { latitude, longitude, distance, limit } = req.query;

    if (!limit) {
      limit = 5;
    }

    const nearyByHospitals = await Hospital.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseInt(longitude), parseInt(latitude)]
          },
          $maxDistance: distance * METERS_PER_MILES
        }
      }
    })
      .populate({ category: 1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: nearyByHospitals
    });
  } catch (err) {
    res.json({
      success: false
    });
    handleError(err);
  }
};

const addHospital = async (req, res, next) => {
  try {
    const {
      hospitalName,
      address,
      description,
      websiteUrl,
      mobileNo,
      emailId,
      hospitalImage,
      latitude,
      longitude
    } = req.body;
    const hospital = new Hospital({
      hospitalName,
      address,
      description,
      websiteUrl,
      mobileNo,
      emailId,
      thumbnailImage:
        hospitalImage ||
        'https://clarkebenefits.com/wp-content/uploads/2018/07/hospital-icon.png',
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });

    await hospital.save();

    res.status(200);
    return res.json({
      success: true,
      data: 'Hospital added'
    });
  } catch (err) {
    res.status(404);
    return res.json({
      success: false,
      data: 'Unable to add hospital'
    });
  }
};
const updtaeHospital = async (req, res, next) => {
  const { hospitalId } = req.params;

  const {
    hospitalName,
    address,
    description,
    websiteUrl,
    mobileNo,
    emailId,
    hospitalImage,
    latitude,
    longitude
  } = req.body;

  const hospital = new Hospital({
    hospitalName,
    address,
    description,
    websiteUrl,
    mobileNo,
    emailId,
    thumbnailImage:
      hospitalImage ||
      'https://clarkebenefits.com/wp-content/uploads/2018/07/hospital-icon.png',
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  });
  try {
    const updtaeHospital = await Hotel.findOne({ _id: hospitalId });
    if (updtaeHospital) {
      hotel = await Hotel.findOneAndUpdate(
        { _id: hospitalId },
        { $set: hospital },
        { new: true }
      );

      return res.status(200).json({
        code: 200,
        data: {
          message: ['hospital Updated']
        },
        success: true
      });
    }
  } catch (error) {
    res.json({ msg: 'server error', error });
  }
};

module.exports = {
  getHospitalListing,
  getHospitalById,
  getNearyByHospitals,
  addHospital,
  deleteHospitalListing,
  updtaeHospital
};
