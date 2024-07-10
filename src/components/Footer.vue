<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <img src="@/assets/daou_logo.png" alt="DAOU 다우기술" class="footer-logo">
        </div>
        <div class="footer-right">
          <p><span class="department">사방넷연동개발팀</span> 홍진수 학생인턴 | 정성윤 학생인턴</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #f9f9f9;
    color: #333;
    padding: 10px 20px;
    text-align: center;
    border-top: 1px solid #ddd;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-left {
    flex: 1;
    text-align: left;
  }
  
  .footer-logo {
    max-width: 100px;
  }
  
  .footer-right {
    flex: 1;
    text-align: right;
  }
  
  .footer-right p {
    margin: 0;
    font-size: 12px;
  }
  
  .footer-right .department {
    font-size: 14px;
    font-weight: bold;
    margin-right: 15px;
  }
  
  </style>
  