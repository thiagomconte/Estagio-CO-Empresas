<template>
  <div class="candidato-home">
    <div class="candidato-home position-relative">
      <i
        @click="backPage"
        class="fas fa-arrow-left position-absolute arrow-left"
      ></i>
      <h1 class="text-center text-light d-block mb-5">
        Gerenciamento de candidatos
      </h1>
      <b-tabs v-model="tabIndex" content-class="mt-3" class="tab mb-5">
        <b-tab title="Candidatos" class="container" active>
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
              <tr v-if="isCandidatoEmpty">
                <td>Nenhuma candidato cadastrado</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <input v-model="cep" type="tel" v-mask="'#####-###'" />
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
            <hr class="mt-5">
            <label class="mt-4"
              >Selecione as vagas que deseja alocar este candidato:</label
            >
            <p v-if="isVagasEmpty">
              <i class="fas fa-times mr-2 text-danger"></i>Nenhuma vaga cadastrada. <router-link to="/vaga" class="cadastra">Cadastre</router-link> agora.
            </p>
            <b-form-group v-else v-slot="{ ariaDescribedby }">
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
            <button class="btn btn-success mt-3" type="submit">
              <i class="far fa-plus-square mr-2"></i>Cadastrar candidato
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
      candidatos: [{}],
      vagas: [],
      selected: [],
      endereco: {},
      tabIndex: 0,
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
    http
      .get("vaga")
      .then((res) => {
        this.vagas = res.data;
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
          vaga_id: this.selected,
        })
        .then((res) => {
          this.candidatos.push(res.data);
          this.$vToastify.success(
            "Candidato cadastrado com sucesso",
            "Sucesso"
          );
          this.tabIndex = 0;
          this.resetForm();
        })
        .catch((err) => {
          this.$vToastify.error(err?.response?.data, "Erro");
        });
    },
    deletaCandidato(id, index) {
      http
        .delete(`candidato/${id}`)
        .then(() => {
          this.candidatos.splice(index, 1);
          this.$vToastify.success("Candidato removido com sucesso", "Sucesso");
        })
        .catch((err) => {
          this.$vToastify.error(err?.response?.data, "Erro");
        });
    },
    backPage() {
      this.$router.push("/");
    },
    resetForm() {
      this.nome = "";
      this.cep = "";
    },
  },
  watch: {
    cep() {
      if (this.cep.length === 9) {
        http
          .get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then((res) => {
            this.endereco = res.data;
          })
          .catch(() => {
            this.endereco = {};
          });
      }
    },
  },
  computed:{
    isCandidatoEmpty() {
      if(this.candidatos.length > 0) {
        return false;
      }
      return true;
    },
    isVagasEmpty() {
      if(this.vagas.length > 0) {
        return false;
      }
      return true;
    }
    
  }
};
</script>

<style scoped>
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
  height: 2.2rem;
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

.readonly input {
  background: silver;
}

.cadastra{
  color: #007bff !important;
}

hr{
  border: 1px solid #f8f9fa;
}
</style>