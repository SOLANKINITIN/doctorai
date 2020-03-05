const { Category } = require("Models");
const { handleError } = require("Helper");

const addCategory = async (req, res, next) => {
    try {
      const { title,description } = req.body;

      const category = new Category({
        title,
        description
      });

      await category.save();
      res.status(200);
      return res.json({
          success: true,
          data: category,
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

const getCategoryListing = async (req,res,next)=>{
  try{

    const categories = await Category.find({});
    res.status(200);
    return res.json({
        success: true,
        data: categories,
    });

  } catch(err){
    handleError(err);
    res.status(404);
    return res.json({
        success: false,
        error: err,
    });
  }
}

module.exports = {
  addCategory,
  getCategoryListing,
};
