<template>
  <div class="edit-vaga position-relative">
    <i
      v-tooltip.hover
      title="Voltar"
      @click="backPage"
      class="fas fa-arrow-left position-absolute arrow-left"
    ></i>
    <h1 class="text-center text-light">Atualizar vaga</h1>
    <form @submit.prevent="editaVaga(id)">
      <div class="input-field">
        <label>Cargo</label>
        <input v-model="cargo" type="text" />
      </div>
      <div class="input-field mt-4">
        <label>Descrição</label>
        <textarea v-model="descricao" rows="5"></textarea>
      </div>
      <button class="btn btn-success mt-3" type="submit">
        <i class="far fa-edit mr-2"></i>Salvar alterações
      </button>
    </form>
  </div>
</template>

<script>
import { http } from "../../config/axios_config";
export default {
  data() {
    return {
      id: "",
      cargo: "",
      descricao: "",
    };
  },
  created() {
    http
      .get(`vaga/${this.$route.query.vaga}`)
      .then((res) => {
        this.id = res.data._id;
        this.cargo = res.data.cargo;
        this.descricao = res.data.descricao;
      })
      .catch((err) => {
        alert(err?.response?.data);
      });
  },
  methods: {
    backPage() {
      this.$router.push("/vaga");
    },
    editaVaga(id) {
      http
        .put(`vaga/${id}`, {
          cargo: this.cargo,
          descricao: this.descricao,
        })
        .then((res) => {
          this.$router.push("/vaga", () => {
            this.$vToastify.success(res.data, "Sucesso");
          });
        })
        .catch((err) => {
          this.$vToastify.error(err?.response?.data, "Erro");
        });
    },
  },
};
</script>

<style scoped>
.arrow-left {
  top: 0;
  left: 0px;
  color: #f8f9fa;
  font-size: 2rem;
  cursor: pointer;
}

.input-field {
  display: relative;
  width: 100%;
}

input,
textarea {
  width: 100%;
  font-size: 1.1rem;
  padding-left: 0.5rem;
  border-radius: 0.3rem;
  border: none;
}

input:focus,
textarea:focus {
  outline: none;
}

label {
  font-size: 1.3rem;
  color: #f8f9fa;
}
</style>