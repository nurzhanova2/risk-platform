<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Financial Platform</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample04">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link to="/chat" class="nav-link">Chat</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/financial-terms" class="nav-link">Financial Terms</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/risk-calculator" class="nav-link">Risk Calculator</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import FinancialTermsContainer from "@/components/FinancialTermsContainer.vue"; 

export default {
  components: {
    FinancialTermsContainer,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: #0f0f0f;
  color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 40px;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  padding: 5px;
}

.nav-link:hover {
  background-color: #555;
}

router-view {
  flex: 1;
  padding: 20px;
}
</style>
