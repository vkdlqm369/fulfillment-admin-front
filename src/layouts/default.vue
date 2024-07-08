<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-navigation-drawer class="pa-6" theme="dark" permanent>
          <v-img
            src="https://wms.sbfulfillment.co.kr/wms/asset/images/logo_fbs_w.svg"
          ></v-img>
          <v-list class="mt-10 text-caption">
            <v-list-item
              class="rounded-lg mb-1"
              prepend-icon="mdi-account-search small=true"
              title="관리자 조회"
              to="/search"
            ></v-list-item>
            <v-list-item
              class="rounded-lg"
              prepend-icon="mdi-archive-search"
              title="관리자 접속 이력"
              to="/history"
            ></v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="ma-2">
              <v-btn block @click="dialog = true"> Logout </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 100vh"><router-view /></v-main>
      </v-layout>

      <v-dialog v-model="dialog" max-width="400" persistent>
        <v-card class="pa-2">
          <v-card-title>
            <v-icon left>mdi-logout</v-icon>
            로그아웃 하시겠습니까?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="handleLogout(false)">아니오</v-btn>
            <v-btn @click="handleLogout(true)">네</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import commonAxios from "@/utils/commonAxios";

const dialog = ref(false);

const handleLogout = (isLogout) => {
  dialog.value = isLogout;

  if (dialog.value) {
    commonAxios
      .get(`/logout`)
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dialog.value = false;
      });
  }
};
</script>
