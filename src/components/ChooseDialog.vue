<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: Boolean,
  message: String,
  icon: {
    type: String,
    default: "mdi-logout",
  },
  iconColor: {
    type: String,
    default: "info",
  },
  to: {
    type: String,
    default: "",
  },
  handleClick: {
    type: Function,
    default: null,
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

const closeDialog = () => {
  isOpen.value = false;
};
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
        <v-btn
          :to="to"
          @click="
            props.handleClick && props.handleClick();
            closeDialog();
          "
          >네</v-btn
        >
        <v-btn @click="closeDialog">아니오</v-btn>
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
