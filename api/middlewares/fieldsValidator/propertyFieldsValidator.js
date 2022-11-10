import joi from "joi";

const propertyFieldsValidator = async (req, res, next) => {
  const userSchema = joi.object({
    street: joi.string().required(),
    unit: joi.string().required(),
    zipCode: joi.number().required(),
    province: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
    type: joi.string().valid("rent","sale").required(),
    price: joi.number().required(),
    description: joi.string().required(),
    roomCount:joi.number().required(),
    images:joi.array().items(joi.string().required()),
    user:joi.string().required(),
    isActive: joi.boolean().default(true),
    viewsCounter:joi.number().default(0)
  });


  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

export { propertyFieldsValidator };
