<template>
  <div class="candidato-home">
    <div class="candidato-home position-relative">
      <i
        @click="backPage"
        class="fas fa-arrow-left position-absolute arrow-left"
      ></i>
      <h1 class="text-center text-light d-block">
        Gerenciamento de candidatos
      </h1>
      <b-tabs content-class="mt-3" class="tab mb-5">
        <b-tab title="candidatos" class="container" active>
          <table class="table table-light table-striped">
            <thead>
              <tr>
                <th scope="col">nome</th>
                <th scope="col">cep</th>
                <th scope="col">Editar</th>
                <th scope="col">Remover</th>
                <th scope="col">Informações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!candidatos">
                <td>Nenhuma candidato cadastrada</td>
              </tr>
              <tr
                v-else
                v-for="(candidato, index) in candidatos"
                :key="candidato._id"
              >
                <td>{{ candidato.nome }}</td>
                <td>{{ candidato.cep }}</td>
                <td>
                  <router-link
                    :to="{
                      path: '/candidato/editar',
                      query: { candidato: candidato._id },
                    }"
                    class="btn btn-sm btn-primary"
                  >
                    <i class="far fa-edit" v-b-tooltip.hover title="Editar"></i>
                  </router-link>
                </td>
                <td>
                  <button
                    @click="deletaCandidato(candidato._id, index)"
                    class="btn btn-sm btn-danger"
                  >
                    <i
                      class="far fa-trash-alt"
                      v-b-tooltip.hover
                      title="Voltar"
                    ></i>
                  </button>
                </td>
                <td>
                  <router-link
                    :to="{
                      path: '/candidato/view',
                      query: { candidato: candidato._id },
                    }"
                    class="btn btn-sm btn-success"
                  >
                    <i
                      class="far fa-eye"
                      v-b-tooltip.hover
                      title="Mais informações"
                    ></i>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="Adicionar candidato" class="container">
          <form @submit.prevent="criaCandidato">
            <div class="row">
              <div class="col-md-9">
                <label>Nome</label>
                <input v-model="nome" type="text" />
              </div>
              <div class="col-md-3">
                <label>CEP</label>
                <input v-model="cep" />
              </div>
            </div>
            <button class="btn btn-success mt-3" type="submit">
              <i class="far fa-plus-square mr-2"></i>Adicionar candidato
            </button>
          </form>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { http } from "../../config/axios_config";
export default {
  data() {
    return {
      nome: "",
      cep: "",
      candidatos: [],
    };
  },
  created() {
    http
      .get("candidato")
      .then((res) => {
        this.candidatos = res.data;
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  },
  methods: {
    criaCandidato() {
      http
        .post("candidato", {
          nome: this.nome,
          cep: this.cep,
        })
        .then(() => {
          this.$router.go();
        })
        .catch((err) => {
          alert(err?.response?.data);
        });
    },
    deletaCandidato(id, index) {
      http
        .delete(`candidato/${id}`)
        .then((res) => {
          this.candidatos.splice(index, 1);
          console.log(res.data);
          this.$router.go();
        })
        .catch((err) => {
          alert(err?.response?.data);
        });
    },
    backPage() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.tab {
  color: #f8f9fa;
}

.nav-tabs .nav-link {
  color: #f8f9fa !important;
}

.nav-tabs .nav-link:focus,
.nav-link.active {
  color: #121212 !important;
}

.input-field {
  display: relative;
  width: 100%;
}

input {
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
  font-size: 1.5rem;
}
.arrow-left {
  top: 0;
  left: 0px;
  color: #f8f9fa;
  font-size: 2rem;
  cursor: pointer;
}
</style>