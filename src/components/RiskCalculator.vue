<template>
  <div class="risk-calculator-container">
    <form @submit.prevent="calculateRisk" class="risk-form">
      <label for="assetsData">Введите данные об активах (через запятую, пробел или точку с запятой):</label>
      <input v-model="assetsData" type="text" id="assetsData" />

      <label for="weightsData">Введите весовые коэффициенты (через запятую, пробел или точку с запятой):</label>
      <input v-model="weightsData" type="text" id="weightsData" />

      <button type="submit" class="calculate-button">Рассчитать риски</button>
    </form>

    <div v-if="Object.keys(results).length > 0" class="results">
      <p>Результаты расчета:</p>
      <p v-if="results.return !== undefined">Доходность портфеля: {{ results.return.toFixed(2) }}%</p>
      <p v-if="results.stdDev !== undefined">Стандартное отклонение: {{ results.stdDev.toFixed(2) }}</p>
      <p v-if="results.correlation !== undefined">Коэффициент корреляции: {{ results.correlation.toFixed(2) }}</p>
      <p v-if="results.beta !== undefined">Бета: {{ results.beta.toFixed(2) }}</p>
      <p v-if="results.var95 !== undefined">Value at Risk (VaR) в 95%: {{ results.var95.toFixed(2) }}</p>
      <p v-if="results.cvar95 !== undefined">Conditional Value at Risk (CVaR) в 95%: {{ results.cvar95.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assetsData: "",
      weightsData: "",
    };
  },
  computed: {
    results() {
      // Получаем результаты расчетов из состояния Vuex
      return this.$store.state.riskCalculator.results;
    },
  },
  methods: {
    calculateRisk() {
      const assets = this.assetsData.split(/[,;\s]+/);
      const weights = this.weightsData.split(/[,;\s]+/);
      this.$store.commit("riskCalculator/setAssets", assets);
      this.$store.commit("riskCalculator/setWeights", weights);
      this.$store.dispatch("riskCalculator/calculateRisk");
    },
  },
};
</script>

  <style>
  .risk-calculator-container {
    max-width: 400px;
    margin: 0 auto;
    
  }
  
  .risk-form {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
  }
  
  label {
    margin-bottom: 8px;
  }
  
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 16px;
  }
  
  .calculate-button {
    padding: 8px 16px;
    background-color: #10151a;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .calculate-button:hover {
    background-color: #0056b3;
  }
  
  .results {
    margin-top: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
  }
  </style>
  