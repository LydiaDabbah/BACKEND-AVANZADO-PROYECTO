import Message from "../models/Message.js";
import Property from "../models/Property.js";
import { createGeneric } from "./genericController.js";

const create = createGeneric(Message);

const read = async (req, res) => {
  try {
    const userId = req.payload.userId;

    if (!userId) {
      return res.status(403).json({
        msg: "Token invalid",
      });
    }

    const properties = await Property.find({ user: userId });
    const message = await Message.find({ property: { $in: properties } })
      .populate("property", "userr")
      .populate("user", ["name", "lastName", "email", "phoneNumber"]);

    if (message.length === 0) {
      return res.status(404).json({
        msg: "The search has 0 results",
      });
    }

    return res.json({
      msg: "The messages were found succesfully",
      message,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "There was a problem with the search",
      error,
    });
  }
};

const readById = async (req, res) => {
  try {
    const userId = req.payload.userId;

    if (!userId) {
      return res.status(403).json({
        msg: "Token invalid",
      });
    }

    const message = await Message.findById(req.params.id);
    const property = await Property.findById(message.property);

    if (property.user.toString() !== userId &&
    message.user.toString() !== userId) {// o el dueño de la propiedad o el que mando el mensaje
      return res.status(404).json({
        msg: "You dont have permission to perform this action",
      });
    }

    return res.json({
      msg: "The message was found succesfully",
      message,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "There was a problem with the search",
      error,
    });
  }
};

const respond = async (req, res) => {
  const { id } = req.params;
  req.body.prevMessage = id;
  console.log(req.body);

  try {
    //autorizar
    const userId = req.payload.userId;

    if (!userId) {
      return res.status(403).json({
        msg: "Token invalid",
      });
    }

    const message = await Message.findById(req.params.id);
    const property = await Property.findById(message.property);

    if (
      property.user.toString() !== userId &&
      message.user.toString() !== userId
    ) {
      return res.status(404).json({
        msg: "You dont have permission to perform this action",
      });
    }

    const objectMessage = {
      from: userId,
      message: req.body.messages[0].message,
    };

    console.log(objectMessage);
    const newMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { $push: { messages: objectMessage } },
      { new: true }
    );

    return res.json({
      msg: "Created succesfully",
      newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong. Please try again later",
      error,
    });
  }
};

export { create, read, readById, respond };
