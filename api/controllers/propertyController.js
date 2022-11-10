import Property from "../models/Property.js";
import {readGeneric,updateGeneric,readByIdGeneric, createGeneric} from "./genericController.js"
import { filterObjectProperties } from "../filterObjectProperties.js";

const update=updateGeneric(Property)
const readById=readByIdGeneric(Property)
const create=createGeneric(Property)
const propertyFilter = async (req, res) => {
  try {

    const { minPrice, maxPrice, City, ZipCode, minRooms, maxRooms, User } =req.query;

    const filter = {};

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
  
    console.log(filter);
     
   // const filter= filterObjectProperties(req)
    const property = await Property.find(filter, {
      _id: 1, 
      images: { $slice: ["$images", 1] },
    }).populate("user", ["name", "lastName"]); // el slice e spara que me de solo la primera imagen

    if (!property) {
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

export { create, readById, propertyFilter, update };
