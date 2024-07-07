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
              <v-btn block> Logout </v-btn>
            </div>
          </template>
        </v-navigation-drawer>
        <v-main style="height: 100vh"><router-view /></v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup></script>
