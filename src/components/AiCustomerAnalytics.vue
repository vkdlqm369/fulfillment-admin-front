<template>
    <div id="app">
      <header>
        <h1>My Test Page</h1>
      </header>
      <main>
        <h2>{{ message }}</h2>
        <button @click="changeMessage">Click me</button>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        message: 'Welcome to Your Vue 3 App'
      }
    },
    methods: {
      changeMessage() {
        this.message = 'You clicked the button!'
      }
    }
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  header {
    background-color: #42b983;
    padding: 20px;
    color: white;
  }
  
  main {
    margin: 40px 0;
  }
  
  button {
    padding: 10px 20px;
    background-color: #42b983;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #333;
  }
  </style>
  