const state = {
    messages: [
      { id: 1, text: "Здраствуйте! Вам нужна помощь?" },
      { id: 2, text: "Всё хорошо, спасибо!" },
    ],
  };
  
  const mutations = {
    addMessage(state, message) {
      state.messages.push(message);
    },
  };
  
  const actions = {
    sendMessage({ commit }, message) {
      commit("addMessage", message);
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  