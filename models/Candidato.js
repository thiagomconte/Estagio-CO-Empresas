const { model, Schema } = require("mongoose");

const CandidatoSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  cep: {
    type: String,
  },
  endereco: {
    type: Object,
  },
  vaga_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vaga",
    },
  ],
});

module.exports = model("Candidato", CandidatoSchema);
