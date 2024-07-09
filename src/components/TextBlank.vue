<script setup>

const props = defineProps(['labelName']);
const inputText = defineModel('inputText')

</script>

<template >
    <v-text-field v-model="inputText"
                  :style="{width: width + 'px', height: height + 'px'}"
                  :label="labelName"
            />
</template>

<script>

export default {
  data(){
    return {
      width: 200,
      height: 20,
    }
  }
};
</script>