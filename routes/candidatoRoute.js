const router = require("express").Router();
const Candidato = require("../models/Candidato");
const candidatoVal = require("../helpers/candidatoVal");
const fetch = require("node-fetch");

/**
 * @POST
 * CRIA VAGA
 */
router.post("/", candidatoVal, async (req, res) => {
  try {
    let { nome, cep, vaga_id } = req.body;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then(async (address) => {
        if (address['erro']) return res.status(404).json("Endereço não encontrado.");
        const candidato = new Candidato({
          nome,
          cep,
          endereco: address,
          vaga_id,
        });
        await candidato.save();
        return res.json(candidato);
      })
      .catch((err) => {
        return res.status(404).json("Endereço não encontrado");
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json("Não foi possível cadastrar o candidato");
  }
});

/**
 * @GET
 * LISTA TODOS OS CANDIDATOS
 */
router.get("/", async (req, res) => {
  try {
    const candidatos = await Candidato.find();
    return res.json(candidatos);
  } catch (error) {
    return res
      .status(400)
      .json("Não foi possível carregar a lista de candidatos");
  }
});

/**
 * @GET
 * RETORNA CANDIDATO POR ID
 */
router.get("/:id", async (req, res) => {
  try {
    const candidato = await Candidato.findById(req.params.id).populate('vaga_id');
    if (!candidato) return res.status(404).json("Candidato não foi encontrado");
    return res.json(candidato);
  } catch (error) {
    return res
      .status(400)
      .json("Não foi possível carregar o candidato selecionado");
  }
});

/**
 * @PUT
 * ATUALIZA CANDIDATO POR ID
 */
router.put("/:id", candidatoVal, async (req, res) => {
  try {
    let { nome, cep, vaga_id } = req.body;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then(async (address) => {
        if (address['erro']) return res.status(404).json("Endereço não encontrado.");
        await Candidato.findByIdAndUpdate(req.params.id, {
          $set: {
            nome,
            cep,
            endereco: address,
            vaga_id,
          },
        });
        return res.json("Os dados do candidato foram atualizados com sucesso");
      })
      .catch((err) => {
        return res.status(404).json("Endereço não encontrado");
      });
  } catch (error) {
    return res.status(400).json("Não possível atualizar os dados do candidato");
  }
});

/**
 * @DELETE
 * DELETA CANDIDATO POR ID
 */
router.delete("/:id", async (req, res) => {
  try {
    await Candidato.findByIdAndDelete(req.params.id);
    return res.json("Candidato foi removido com sucesso");
  } catch (error) {
    return res
      .status(400)
      .json("Não foi possível remover o candidato selecionado");
  }
});

module.exports = router;
