import Property from "../../models/Property.js";

const propertyValidator = async (req, res, next) => {

  try {

    const property= await Property.findById(req.body.property)
    
    if (!property) {
      return res.status(403).json({
        msg: "We couldn't find the property in our system",
      });
    }

    next();

  } catch (error) {
   
    return res.status(403).json({
      msg: 'There was a problem with the request',
      error
    });
  }
};

export { propertyValidator };