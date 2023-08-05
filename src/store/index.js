import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import chat from './chat';
import riskCalculator from './riskCalculator';
import financialTerms from './financialTerms';

export default new Vuex.Store({
  modules: {
    chat, 
    riskCalculator,
    financialTerms,
  },
});
