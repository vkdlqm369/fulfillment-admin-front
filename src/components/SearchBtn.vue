<script setup>
import { useInputTextForSearchStore } from "@/stores/index";

const store = useInputTextForSearchStore()

</script>


<template>
  <v-btn style="width:80px; height:50px;">
    <v-icon>mdi-account-search</v-icon>
  </v-btn>
</template>
