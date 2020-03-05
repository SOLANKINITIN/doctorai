const { Doctor ,Hospital} = require("Models");
const { handleError } = require("Helper");

const addDoctor = async (req,res,next) => {
    try {
    const { doctorName,hospitalId, longitude, latitude, degree,description,category,thumbnailImage } = req.body;

    const doctor = new Doctor({
        doctorName,
        hospitalId,
        degree,
        description,
        thumbnailImage:thumbnailImage||'https://image.freepik.com/free-photo/doctor-smiling-with-stethoscope_1154-36.jpg',
        category,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        }
    });

    await Hospital.updateOne({_id:hospitalId},{ $addToSet: { category:category }});

    await doctor.save();
    res.status(200);
    return res.json({
      success:true,
      data:'Doctor added',
    })

    } catch(err){
        handleError(err);
        res.status(404);
        return res.json({
            success:false,
            error:err,
        });
    }
}

module.exports = {
  addDoctor,
};
