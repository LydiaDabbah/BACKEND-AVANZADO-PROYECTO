import Property from "../models/Property.js";
import { GenericController } from "./classGenericController.js";

const controllerGeneric = new GenericController(Property);
const { create, update, remove } = controllerGeneric;


const propertyFilter = async (req, res) => {
  try {
    const { minPrice, maxPrice, City, ZipCode, minRooms, maxRooms, User,Type } =
      req.query;

    const filter = {
      isActive: true,
    };

    //object. keys
    if (minPrice && !maxPrice) {
      filter.price = { $gte: minPrice };
    }

    if (maxPrice && !minPrice) {
      filter.price = { $lte: maxPrice };
    }
    if (minPrice && maxPrice) {
      console.log(minPrice);
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (minRooms && !maxRooms) {
      filter.roomCount = { $gte: minRooms };
    }

    if (maxRooms && !minRooms) {
      filter.roomCount = { $lte: maxRooms };
    }
    if (minRooms && maxRooms) {
      console.log(minPrice);
      filter.roomCount = { $gte: minRooms, $lte: maxRooms };
    }

    if (City) {
      filter.city = City;
    }

    if (ZipCode) {
      filter.zipCode = ZipCode;
    }

    if (User) {
      filter.user = User;
    }

    if (Type){
      filter.type=Type;
    }

    console.log(filter);

    const property = await Property.find(filter, {
      _id: 1,
      price: 1,
      roomCount: 1,
      city: 1,
      description: 1,
      type:1,
      images: { $slice: ["$images", 1] },
    }).populate("user", ["name", "lastName"]); // el slice e spara que me de solo la primera imagen

    if (property.length===0) {
      return res.status(404).json({
        msg: "The search has 0 results",
      });
    }

    return res.json({
      msg: `Properties were found succesfully`,
      property,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "There was a problem with the search",
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
        msg: "We couldn't find the document",
      });
    }

    property.viewsCounter = property.viewsCounter + 1;
    const newProperty = await Property.findByIdAndUpdate(
      id,
      { viewsCounter: property.viewsCounter },
      { new: true }
    );

    return res.json({
      msg: "Property found",
      newProperty,
    });
  } catch (error) {
    return res.json({
      msg: "There was a problem with the search",
      error,
    });
  }
};

export { create, readById, propertyFilter, update, remove };
