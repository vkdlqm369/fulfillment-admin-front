<script setup>


const props = defineProps(['labelName', 'itemList'])
const selected = defineModel('selected')

</script>

<script>
export default {

  data(){
    return {
      width:200,
      height: 20,
    }
  }
};
</script>

<template>
    <v-select
    v-model="selected"
    :style="{width: width + 'px', height: height + 'px'}"
    :label="labelName"
    :items="itemList"
    item-title="name"
    item-value="value"
    >
   </v-select>
</template>

