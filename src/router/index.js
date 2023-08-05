import Vue from 'vue';
import VueRouter from 'vue-router';
import Chat from '@/components/Chat.vue';
import FinancialTerms from '@/components/FinancialTerms.vue';
import RiskCalculator from '@/components/RiskCalculator.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/chat',
    component: Chat,
  },
  {
    path: '/financial-terms',
    component: FinancialTerms,
  },
  {
    path: '/risk-calculator',
    component: RiskCalculator,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
