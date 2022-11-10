class GenericController {
  constructor(Model) {
    this.Model = Model;
  }

  read = async (req, res) => {
    try {
      const model = await this.Model.find(req.query);

      if (!model) {
        return res.status(404).json({
          msg: "The search has 0 results",
        });
      }

      return res.json({
        msg: "Documents were found succesfully",
        model,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "There was a problem with the search",
        error,
      });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    try {
      const model = await this.Model.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.json({
        msg: "Document updated",
        model,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "We couldn`t update the document",
        error,
      });
    }
  };
  readById = async (req, res) => {
    const { id } = req.params;

    try {
      const model = await this.Model.findById(id);

      if (!model) {
        return res.status(404).json({
          msg: "We couldn't find the document",
        });
      }

      return res.json({
        msg: "Document found",
        model,
      });
    } catch (error) {
      return res.json({
        msg: "There was a problem with the search",
        error,
      });
    }
  };

  create = async (req, res) => {
    try {
      const model = await this.Model.create(req.body);
      return res.json({
        msg: "Created succesfully",
        model,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Something went wrong. Please try again later",
        error,
      });
    }
  };

  remove = async (req, res) => {
    const { id } = req.params;

    try {
      const modelId = await this.Model.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );
      return res.json({
        msg: "Deleted successfully",
        modelId,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "There was a probleme with the delete. Try again later",
        error,
      });
    }
  };
}

export { GenericController };
