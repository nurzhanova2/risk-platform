import termsData from "./@/../../terms.json"; 

const state = {
  terms: termsData,
  searchTerm: "",
  matchingTerms: [], 
};

const mutations = {
  setSearchTerm(state, term) {
    state.searchTerm = term;
  },
  setMatchingTerms(state, matchingTerms) {
    state.matchingTerms = matchingTerms;
  },
};

const actions = {
  searchTerms({ commit, state }, searchTerm) {
    const matchingTerms = Object.keys(state.terms).filter((term) =>
      term.toLowerCase().includes(searchTerm.toLowerCase())
    );
    commit("setMatchingTerms", matchingTerms);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};