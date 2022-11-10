import joi from "joi";

const messageFieldsValidator = async (req, res, next) => {
  const userSchema = joi.object({
    user: joi.string().required(),
    property: joi.string().required(),
    messages: joi
      .array()
      .items({ from: joi.string().required(), message: joi.string().required() }),
    
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

export {messageFieldsValidator}