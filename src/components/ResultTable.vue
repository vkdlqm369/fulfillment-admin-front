<script setup>

const props = defineProps(['tableItems', 'headerss'])



</script>

<template>
    <v-data-table-virtual 
    :items="tableItems"
    :headers="headerss"
    ></v-data-table-virtual>
</template>