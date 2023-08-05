<template>
    <div class="financial-terms-container">
      <form @submit.prevent="searchTerms" class="search-form">
        <input v-model="searchTerm" type="text" class="search-input" placeholder="Поиск терминов" />
        <button type="submit" class="search-button">Найти</button>
      </form>
  
      <div v-if="matchingTerms.length > 0" class="term-list">
        <p class="term-heading">Список найденных терминов:</p>
        <ul>
          <li v-for="term in matchingTerms" :key="term" class="term-item">
            {{ term }} - {{ $store.state.financialTerms.terms[term] }}
          </li>
        </ul>
      </div>
      <p v-else class="no-results">Ничего не найдено</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: "",
      };
    },
    computed: {
      matchingTerms() {
        return this.$store.state.financialTerms.matchingTerms;
      },
    },
    methods: {
      searchTerms() {
        this.$store.dispatch("financialTerms/searchTerms", this.searchTerm);
      },
    },
  };
  </script>
  
  <style>
  .financial-terms-container {
    height: 100vh;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .search-form {
    display: flex;
    margin-top: 16px;
  }
  
  .search-input {
    flex: 1;
    padding: 38px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-button {
    margin-left: 8px;
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #0056b3;
  }
  
  .term-list {
    margin-top: 16px;
  }
  
  .term-heading {
    font-weight: bold;
    padding: 16px 39px;
  }
  
  .term-item {
    margin: 8px 0;
  }
  
  .no-results {
    margin-top: 16px;
    color: #ff0000;
    font-weight: bold;
  }
  </style>
  