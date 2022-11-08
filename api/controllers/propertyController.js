import Property from "../models/Property.js";


const create = async (req, res) => {
  try {
  
    const property = await Property.create(req.body);
    return res.json({
      msg: 'The property was created succesfully',
      property,
    });
  } catch (error) {
   
    return res.status(500).json({
      msg: 'Something went wrong. Please try again later',
      error,
    });
  }
};



const read = async (req, res) => {
  try {
    const property = await Property.find(req.query).populate('user');;
    
    if (!property) {
        return res.status(404).json({
          msg: "The search has 0 results",
        });
      }

    return res.json({
      msg: 'Properties were found succesfully',
      property,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'There was a problem with the search',
      error,
    });
  }
};

const readById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);


    if (!property) {
        return res.status(404).json({
          msg: "We couldn't find the property",
        });
      }

    return res.json({
      msg: 'Property found',
      property,
    });
  } catch (error) {
    return res.json({
      msg: "There was a problem with the search",
      error,
    });
  }
};


const update = async (req, res) => {
  const { id } = req.params;
  try {
    const property= await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    }); 

    return res.json({
      msg: 'Property updated',
      property
    });

  } catch (error) {
    return res.status(500).json({
      msg: "We couldn`t update the property",
      error,
    });
  }
};

const remove = () => {};

export { create, read, readById, remove, update };
