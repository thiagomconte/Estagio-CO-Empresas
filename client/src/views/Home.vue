<template>
  <div class="home">
    <h1 class="text-center text-light display-4">Bem-vindo Admin</h1>
    <router-link to="/vaga" class="options text-center">
      Gerenciar Vagas<i class="fas fa-list-ul ml-3"></i>
    </router-link>
    <router-link to="/candidato" class="options text-center">
      Gerenciar Candidatos<i class="fas fa-users ml-3"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.options {
  display: block;
  margin-top: 5rem;
  font-size: 2rem;
  color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 0.3rem;
  padding: 1rem;
  background: #252525;
  border: none;
}

.home {
  animation: .5s ease-out 0s 1 slideInFromLeft;
}
</style>
