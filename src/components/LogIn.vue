<template>
  <div class="login">
    <h1>Need to Admin Authentication</h1>
    <div id="loginForm">

    <p>
      <input class="w3-input" name="sellerNo" placeholder="Enter your Seller Number" v-model="sellerNo"><br>
    </p>
    <p>
      <input class="w3-input" name="apiKey" placeholder="Enter your API Key" v-model="apiKey"><br>
    </p>
    <p>
      <input class="w3-input" name="sltnCd" placeholder="Enter your Solution Code" v-model="sltnCd" type="password">
    </p>
    <button @click="goToTopButton">관리자 인증하기</button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  methods: {
    goToTopButton() {
      this.$router.push('/app');
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}



button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
