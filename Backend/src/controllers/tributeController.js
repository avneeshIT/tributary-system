const tributeService = require("../services/tributeService");








// exports.createTribute = async (req, res) => {
//   try {
//     const tribute = await tributeService.createTribute(req);
//     res.status(201).json(tribute);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };  
// exports.createTribute = async (req, res) => {
//   console.log("BODY:", req.body);
//   console.log("FILE:", req.file);

//   res.json({
//     body: req.body,
//     file: req.file
//   });
// };
exports.createTribute = async (req, res, next) => {
  try {
    const tribute = await tributeService.createTribute(req);
    res.status(201).json(tribute);
  } catch (error) {
    next(error);
  }
};




exports.updateTribute = async (req, res,next) => {
  try {
    const tribute = await tributeService.updateTribute(req);
    res.status(200).json(tribute);
  } catch (error) {
 next(error);  }
};

 exports.deleteTribute = async (req, res,next) => {
  try {
    await tributeService.deleteTribute(req);
    res.status(200).json({ message: "Tribute deleted successfully" });
  } catch (error) {
next(error);  }
};

exports.getAllTributes = async (req, res) => {
  try {
    const tributes = await tributeService.getAllTributes();
    res.status(200).json(tributes);
  } catch (error) {
next(error);  }


 

};