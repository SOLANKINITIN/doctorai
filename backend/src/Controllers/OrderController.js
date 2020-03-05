const { Order, Cab, Doctor } = require("Models");
const { handleError } = require("Helper");
const mongoose = require("mongoose");

const createOrder = async (req, res, next) => {
  try {
    const {
      patientId,
      hospitalId,
      userId,
      pickupLatitude,
      pickupLongitude,
      destinationLatitude,
      destinationLongitude,
      categoryId
    } = req.body;

    // Format Location According To DB
    const getLocationData = (latitude, longitude) => {
      return {
        type: "Point",
        coordinates: [longitude, latitude]
      };
    };

    const pickupLocation = getLocationData(pickupLatitude, pickupLongitude);
    const destinationLocation = getLocationData(
      destinationLatitude,
      destinationLongitude
    );

    const doctor = await Doctor.findOne({
      hospitalId: mongoose.Types.ObjectId(hospitalId),
      category: mongoose.Types.ObjectId(categoryId)
    });
    // Creating Order
    const order = new Order({
      patientId,
      hospitalId,
      userId,
      pickupLocation,
      destinationLocation,
      doctorId: doctor._id,
      orderStatus: 0 // 0 Means Order Created and Yet no cab has booked this
    });

    // Saving Order
    await order.save();

    res.status(200);
    return res.json({
      success: true,
      data: order
    });
  } catch (err) {
    handleError(err);
    res.status(404);
    return res.json({
      success: false,
      error: err
    });
  }
};

const completeOrder = async (req, res, next) => {
  try {
    const { orderId, cabId } = req.body;
    await Order.updateOne({ _id: orderId }, { $set: { orderStatus: 2 } }); // 2 Means Order is Completed
    await Cab.updateOne({ _id: cabId }, { $inc: { cabsBooked: 1 } }); // Increment Total Number of Books Cabs

    res.status(200);
    return res.json({
      success: true
    });
  } catch (err) {
    handleError(err);
    res.status(404);
    return res.json({
      success: false,
      errro: err
    });
  }
};

const getOrderByType = async (req, res, next) => {
  try {
    const { id, type } = req.query;
    let data = [];

    switch (type) {
      case "CAB":
        data = await Order.find({ cabId: id }).sort({ updatedAt: -1 });
        break;
      case "USER":
        data = await Order.find({ userId: id })
          .populate("patientId hospitalId")
          .sort({ updatedAt: -1 });
        break;
      case "HOSPITAL":
        data = await Order.find({ hospitalId: id }).sort({ updatedAt: -1 });
        break;
    }

    res.status(200);
    return res.json({
      success: true,
      data
    });
  } catch (err) {
    handleError(err);
    res.status(404);
    return res.json({
      success: false,
      error: err
    });
  }
};

const getCurrentActiveOrder = async (req, res, next) => {
  try {
    // Getting Current Active Orders
    const activeOrder = await Order.find({ orderStatus: 0 });

    res.status(200);
    return res.json({
      success: true,
      data: activeOrder
    });
  } catch (err) {
    handleError(err);
    res.status(404);
    return res.json({
      success: false,
      error: err
    });
  }
};

module.exports = {
  createOrder,
  completeOrder,
  getOrderByType,
  getCurrentActiveOrder
};
