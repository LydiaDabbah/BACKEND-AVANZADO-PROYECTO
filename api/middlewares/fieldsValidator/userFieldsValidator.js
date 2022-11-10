import joi from "joi";

const userFieldsValidator = async (req, res, next) => {
  const userSchema = joi.object({
    name: joi.string().required(),
    lastName: joi.string().required(),
    dni: joi.string().required(),
    birthDate: joi.date(),
    role: joi.string().valid("admin", "customer").required(),
    phoneNumber: joi.string().required(),
    address: joi.string().required(),
    references: joi
      .array()
      .items({ name: joi.string().required(), phone: joi.string().required() }),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(8).required(),
    isActive: joi.boolean().default(true),
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

export { userFieldsValidator };
