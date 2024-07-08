<script setup>
import { useInputTextForSearchStore } from "@/stores/index";

const store = useInputTextForSearchStore()

</script>


<template>
  <v-btn>
    <v-icon>mdi-account-search</v-icon>
  </v-btn>

</template>
