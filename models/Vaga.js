const { model, Schema } = require("mongoose");

const VagaSchema = new Schema({
  cargo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
});

module.exports = model("Vaga", VagaSchema);
