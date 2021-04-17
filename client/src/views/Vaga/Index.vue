<template>
  <div class="vaga-home position-relative">
    <i
      v-b-tooltip.hover
      title="Voltar"
      @click="backPage"
      class="fas fa-arrow-left position-absolute arrow-left"
    ></i>
    <h1 class="text-center text-light d-block mb-5">Gerenciamento de vagas</h1>
    <b-tabs v-model="tabIndex" content-class="mt-3" class="tab mb-5">
      <b-tab title="Vagas" class="container" active>
        <table class="table table-light table-striped">
          <thead>
            <tr>
              <th scope="col">Cargo</th>
              <th scope="col">Descricao</th>
              <th scope="col">Editar</th>
              <th scope="col">Remover</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isEmpty">
              <td>Nenhuma vaga cadastrada</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-else v-for="(vaga, index) in vagas" :key="vaga._id">
              <td>{{ vaga.cargo }}</td>
              <td>{{ vaga.descricao }}</td>
              <td>
                <router-link
                  :to="{ path: '/vaga/editar', query: { vaga: vaga._id } }"
                  class="btn btn-sm btn-primary"
                >
                  <i
                    class="far fa-edit"
                    v-b-tooltip.hover
                    title="Editar vaga"
                  ></i>
                </router-link>
              </td>
              <td>
                <button
                  @click="deletaVaga(vaga._id, index)"
                  class="btn btn-sm btn-danger"
                >
                  <i
                    class="far fa-trash-alt"
                    v-b-tooltip.hover
                    title="Deletar vaga"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-tab>
      <b-tab title="Adicionar vaga" class="container">
        <form @submit.prevent="criaVaga">
          <div class="input-field">
            <label>Cargo</label>
            <input v-model="cargo" type="text" />
          </div>
          <div class="input-field mt-4">
            <label>Descrição</label>
            <textarea v-model="descricao" rows="5"></textarea>
          </div>
          <button class="btn btn-success mt-3" type="submit">
            <i class="far fa-plus-square mr-2"></i>Adicionar vaga
          </button>
        </form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { http } from "../../config/axios_config";
export default {
  data() {
    return {
      cargo: "",
      descricao: "",
      vagas: [{}],
      tabIndex: 0,
    };
  },
  created() {
    http
      .get("vaga")
      .then((res) => {
        this.vagas = res.data;
      })
      .catch((err) => {
        this.$vToastify.error(err?.response?.data, "Erro");
      });
  },
  methods: {
    criaVaga() {
      http
        .post("vaga", {
          cargo: this.cargo,
          descricao: this.descricao,
        })
        .then((res) => {
          this.vagas.push(res.data);
          this.$vToastify.success("Vaga foi criada com sucesso", "Sucesso");
          this.tabIndex = 0;
          this.resetForm();
        })
        .catch((err) => {
          this.$vToastify.error(err?.response?.data, "Erro");
        });
    },
    deletaVaga(id, index) {
      http
        .delete(`vaga/${id}`)
        .then(() => {
          this.vagas.splice(index, 1);
          this.$vToastify.success("A vaga foi removida com sucesso", "Sucesso");
        })
        .catch((err) => {
          this.$vToastify.error(err?.response?.data, "Erro");
        });
    },
    backPage() {
      this.$router.push("/");
    },
    resetForm() {
      this.cargo = "";
      this.descricao = "";
    },
  },
  computed: {
    isEmpty() {
      if (this.vagas.length > 0) {
        return false;
      }
      return true;
    },
  },
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
  height: 2.2rem;
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
}
.arrow-left {
  top: 0;
  left: 0px;
  color: #f8f9fa;
  font-size: 2rem;
  cursor: pointer;
}
</style>