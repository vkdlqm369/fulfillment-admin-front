<template>
  <div>
    <PopupHeader />
    <PopupBody  />
    <PopupResults :orders="orders" :successCount="successCount" :failureCount="failureCount" />
    <PopupCloseButton @click="sendMsgToParent" />
  </div>
</template>

<script setup>
import PopupHeader from './ordercollectpopup/PopupHeader.vue';
import PopupBody from './ordercollectpopup/PopupBody.vue';
import PopupResults from './ordercollectpopup/PopupResults.vue';
import PopupCloseButton from './ordercollectpopup/PopupCloseButton.vue';


</script>
