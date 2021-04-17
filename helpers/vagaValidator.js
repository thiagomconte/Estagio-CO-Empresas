module.exports = (req, res, next) => {
  let { cargo, descricao } = req.body;
  if (!cargo || !descricao) {
    return res.status(400).json("Preencha todos os campos");
  }
  next();
};
