const { Patient, User, Hospital, Order } = require("Models");
const { handleError } = require("Helper");

const addPatient = async (req, res, next) => {
  try {
    const {
      patientName,
      age,
      contactNumber,
      diseaseDescription,
      hospitalId,
      userId
    } = req.body;

    // Validating User
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      res.status(404);
      return res.json({
        success: false,
        error: "User not found"
      });
    }

    // Validating Hospital Id
    const hospital = await Hospital.findById(hospitalId);
    console.log(hospital);

    if (!hospital) {
      res.status(404);
      return res.json({
        success: false,
        error: "Hospital Not Found"
      });
    }

    // Saving Patient Data

    const patient = new Patient({
      patientName,
      age,
      contactNumber,
      diseaseDescription,
      hospitalId,
      userId,
      verificaionCode: Math.round(Math.random() * 1000000) // Unique 6 Digit Code
    });

    await patient.save();

    console.log(patient);

    // Returning Response To Frontend
    res.status(200);
    return res.json({
      success: true,
      data: {
        ...patient.toObject(),
        destinationLocation: hospital.location
      }
    });
  } catch (err) {
    res.status(404);
    res.json({
      success: false,
      error: err
    });
  }
};

const addPatientCab = async (req, res, next) => {
  try {
    const { patientId, cabId, verificaionCode } = req.body;

    // Verify Code
    const patient = await Patient.findOne({ _id: patientId, verificaionCode });

    if (!patient) {
      res.status(200);
      return res.json({
        success: false,
        data: "Please enter valid verification code"
      });
    }

    // Adding CabId To Patient
    await Patient.updateOne({ _id: patientId }, { $set: { cabId } });

    // Updating Order
    await Order.updateOne({ patientId }, { $set: { orderStatus: 1 } }); // 1 Means Order is in Running State

    res.status(200);
    return res.json({
      success: true,
      data: "Cab assigned to patient"
    });
  } catch (err) {
    handleError(err);
    res.status(404);
    res.json({
      success: false,
      error: err
    });
  }
};

const getUserPatient = async (req, res, next) => {
  try {
    const { userId } = req.query;

    // Getting List Of Patient For That User
    const patients = await Patient.find({ userId });

    console.log(patients);

    res.status(200);
    return res.json({
      success: true,
      data: patients
    });
  } catch (err) {
    handleError(err);
    res.status(404);
    return res.json({
      success: false,
      error
    });
  }
};

module.exports = {
  addPatient,
  addPatientCab,
  getUserPatient
};
