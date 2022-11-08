
const read = (Model)=>async (req, res) => {
    try {
      const model = await Model.find(req.query);
      
      if (!model) {
          return res.status(404).json({
            msg: "The search has 0 results",
          });
        }
  
      return res.json({
        msg: 'Properties were found succesfully',
        model,
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'There was a problem with the search',
        error,
      });
    }
  };

  export default read