


const filterObjectProperties=(req)=>{
  
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

    return filter


}



export {filterObjectProperties}