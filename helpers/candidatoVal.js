module.exports = (req, res, next) => {
  let { nome, cep } = req.body;
  if (!nome || !cep) {
    return res.status(400).json("Nome e CEP devem ser preenchidos");
  }
  next();
};
