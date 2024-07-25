<script setup>

const props = defineProps({
  modelValue: Boolean,
  message: String,
  icon: {
    type: String,
    default: "mdi-alert-circle",
  },
  iconColor: {
    type: String,
    default: "error",
  },
});

const emits = defineEmits(["update:modelValue"]);
const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue;
  }
);

watch(isOpen, (newValue) => {
  emits("update:modelValue", newValue);
});
</script>

<template>
  <v-dialog v-model="isOpen" max-width="400" persistent>
    <v-card class="pa-2">
      <v-card-title>
        <v-responsive>
          <v-icon :color="iconColor" :icon="icon"></v-icon>
          <div class="dialog-message">{{ message }}</div>
        </v-responsive>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="isOpen = false">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.dialog-message {
  white-space: pre-wrap;
  margin-top: 10px;
}
</style>
