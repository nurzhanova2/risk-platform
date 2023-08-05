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
            {{ term }} - {{ terms[term] }}
          </li>
        </ul>
      </div>
      <p v-else class="no-results">Ничего не найдено</p>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      terms() {
        return this.$store.state.financialTerms.terms;
      },
      matchingTerms() {
        const searchTerm = this.searchTerm || ""; 
        return Object.keys(this.terms).filter((term) =>
          term.toLowerCase().includes(searchTerm.toLowerCase())
        );
      },
    },
    data() {
      return {
        searchTerm: "",
      };
    },
    methods: {
      searchTerms() {
        if (this.searchTerm !== undefined && this.searchTerm !== null) {
          this.$store.dispatch("financialTerms/searchTerms");
        }
      },
    },
  };
  </script>
  
  <style>
  .financial-terms-container {
  width: 100%; 
  max-width: 800px; 
  margin: 0 20px; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  }
  
  .search-form {
  padding: 8px;
  display: flex;
  margin-top: 16px;
  justify-content: flex-start;
  align-items: center; 
}

.search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-button {
  margin-left: 8px;
  padding: 8px 16px;
  background-color: #040404;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #ced1d3;
}


  .term-list {
    margin-top: 16px;
  }
  
  .term-heading {
    font-weight: bold;
  }
  
  .term-item {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 8px;
    font-size: 17px;
  }

  .no-results {
    margin-top: 16px;
    color: #ff0000;
    font-weight: bold;
  }
  </style>
  