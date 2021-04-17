<template>
  <div class="edit-Candidato position-relative mb-5">
    <i
      v-b-tooltip.hover
      title="Voltar"
      @click="backPage"
      class="fas fa-arrow-left position-absolute arrow-left"
    ></i>
    <h1 class="text-center text-light">Atualizar Candidato</h1>
    <form @submit.prevent="editaCandidato(id)">
      <div class="row mt-3">
        <div class="col-md-9">
          <label>Nome</label>
          <input v-model="nome" type="text" />
        </div>
        <div class="col-md-3">
          <label>CEP</label>
          <input v-model="cep" />
        </div>
      </div>
      <div class="row readonly mt-3">
        <div class="col-md-7">
          <label>Logradouro</label>
          <input v-model="endereco.logradouro" type="text" readonly />
        </div>
        <div class="col-md-5">
          <label>Complemento</label>
          <input v-model="endereco.complemento" type="text" readonly />
        </div>
      </div>
      <div class="row readonly mt-3">
        <div class="col-md-7">
          <label>Bairro</label>
          <input v-model="endereco.bairro" type="text" readonly />
        </div>
        <div class="col-md-5">
          <label>Localidade</label>
          <input v-model="endereco.localidade" type="text" readonly />
        </div>
      </div>
      <div class="row readonly mt-3">
        <div class="col-md-2">
          <label>UF</label>
          <input v-model="endereco.uf" type="text" readonly />
        </div>
        <div class="col-md-3">
          <label>IBGE</label>
          <input v-model="endereco.ibge" type="text" readonly />
        </div>
        <div class="col-md-2">
          <label>GIA</label>
          <input v-model="endereco.gia" type="text" readonly />
        </div>
        <div class="col-md-2">
          <label>DDD</label>
          <input v-model="endereco.ddd" type="text" readonly />
        </div>
        <div class="col-md-3">
          <label>SIAFI</label>
          <input v-model="endereco.siafi" type="text" readonly />
        </div>
      </div>
      <label class="mt-4">Vagas:</label>
      <b-form-group class="text-light checkbox-group" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="selected"
          :aria-describedby="ariaDescribedby"
        >
          <div v-for="vaga in vagas" :key="vaga._id">
            <b-form-checkbox :value="vaga._id">{{
              vaga.cargo
            }}</b-form-checkbox>
          </div>
        </b-form-checkbox-group>
      </b-form-group>

      <button class="btn btn-success my-3" type="submit">
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
      nome: "",
      cep: "",
      selected: [],
      endereco: {},
      vagas: [],
    };
  },
  created() {
    http
      .get(`candidato/${this.$route.query.candidato}`)
      .then((res) => {
        this.id = res.data._id;
        this.nome = res.data.nome;
        this.cep = res.data.cep;
        this.endereco = res.data.endereco;
        res.data.vaga_id.map( vaga => this.selected.push(vaga._id))
      })
      .catch((err) => {
        alert(err?.response?.data);
      });
    http
      .get("vaga")
      .then((res) => {
        this.vagas = res.data;
      })
      .catch((err) => {
        alert(err?.response?.data);
      });
  },
  methods: {
    backPage() {
      this.$router.push("/candidato");
    },
    editaCandidato(id) {
      http
        .put(`candidato/${id}`, {
          nome: this.nome,
          cep: this.cep,
          vaga_id: this.selected
        })
        .then((res) => {
          this.$router.push("/candidato", () => {
            alert(res.data);
          });
        })
        .catch((err) => {
          alert(err?.response?.data);
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
  font-size: 1.2rem;
  padding-left: 0.5rem;
  border-radius: 0.3rem;
  border: none;
}

input:focus,
textarea:focus {
  outline: none;
}

label {
  font-size: 1.5rem;
  color: #f8f9fa;
}

.readonly input {
  background: silver;
}

.checkbox-group{
  font-size:1.2rem;
}
</style>