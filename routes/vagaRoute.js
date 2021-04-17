const router = require("express").Router();
const Vaga = require("../models/Vaga");
const vagaVal = require("../helpers/vagaValidator");

/**
 * @POST
 * CRIA VAGA
 */
router.post("/", vagaVal, async (req, res) => {
  try {
    let { cargo, descricao } = req.body;
    const vaga = new Vaga({
      cargo,
      descricao,
    });
    await vaga.save();
    return res.json(vaga);
  } catch (error) {
    return res.status(400).json("Não foi possível criar a vaga.");
  }
});

/**
 * @GET
 * LISTA TODAS AS VAGAS
 */
router.get("/", async (req, res) => {
  try {
    const vagas = await Vaga.find();
    return res.json(vagas);
  } catch (error) {
    return res.status(400).json("Não foi possível carregar a lista de vagas");
  }
});

/**
 * @GET
 * RETORNA VAGA POR ID
 */
router.get("/:id", async (req, res) => {
  try {
    const vaga = await Vaga.findById(req.params.id);
    if (!vaga) return res.status(404).json("Vaga não encontrada");
    return res.json(vaga);
  } catch (error) {
    return res.status(400).json("Erro interno ao procurar pela vaga");
  }
});

/**
 * @PUT
 * ATUALIZA VAGA POR ID
 */
router.put("/:id", vagaVal, async (req, res) => {
  try {
    let { cargo, descricao } = req.body;
    const vaga = await Vaga.findByIdAndUpdate(req.params.id, {
      $set: {
        cargo,
        descricao,
      },
    });
    if (!vaga) return res.status(404).json("Vaga não	encontrada");
    return res.json("Os dados da vaga foram atualizados com sucesso");
  } catch (error) {
    return res.status(400).json("Erro ao atualizar dados da vaga");
  }
});

/**
 * @DELETE
 * DELETA VAGA POR ID
 */
router.delete("/:id", async (req, res) => {
  try {
    await Vaga.findByIdAndDelete(req.params.id);
    return res.json("Vaga foi removida com sucesso");
  } catch (error) {
    return res.status(400).json("Não foi possível remover a vaga selecionada");
  }
});

module.exports = router;
