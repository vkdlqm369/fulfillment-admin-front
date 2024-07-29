<script setup>

const dialog = defineModel('dialog')

</script>

<template>

<v-dialog v-model='dialog' max-width="300" max-height="150" persistent>
     <v-card class="pa-2">
          <div class="spinner-container">
            <div class="spinner" />
        </div>
      <v-card-actions>
          <v-btn @click="dialog=false">취소</v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>

</template>

<script>
export default {};
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
}
.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #e0e0e0;
  border-bottom: 5px solid teal;
  animation: spin 1s linear infinite;
  position: relative;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>