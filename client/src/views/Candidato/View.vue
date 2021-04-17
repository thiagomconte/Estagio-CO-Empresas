<template>
  <div class="view-candidato position-relative">
    <i
      v-b-tooltip.hover
      title="Voltar"
      @click="backPage"
      class="fas fa-arrow-left position-absolute arrow-left"
    ></i>
    <h1 class="text-center text-light">Informações de {{nome}}</h1>
    <button @click="backPage" class="btn btn-warning mt-3" type="submit">
      Voltar
    </button>
    <div class="row mt-3 readonly">
      <div class="col-md-9">
        <label>Nome</label>
        <input v-model="nome" type="text" readonly />
      </div>
      <div class="col-md-3">
        <label>CEP</label>
        <input v-model="cep" readonly />
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
    <hr>
    <h3 class="text-light text-center d-block">Vagas de {{nome}}:</h3>
    <div class="list-vaga text-light my-5" v-for="vaga in vagas" :key="vaga._id">
      <h4 class="d-block">{{vaga.cargo}}</h4>
      <div class="descricao">
        . {{vaga.descricao}}
      </div>
    </div>
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
        this.vagas = res.data.vaga_id;
      })
      .catch((err) => {
        alert(err?.response?.data);
      });
  },
  methods: {
    backPage() {
      this.$router.push("/candidato");
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
  font-size: 1.3rem;
  color: #f8f9fa;
}

.readonly input {
  background: silver;
}

hr{
  margin: 2rem auto;
  border: 1px solid #f8f9fa;
}

.list-vaga{

  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1.2rem .7rem;
}
</style>