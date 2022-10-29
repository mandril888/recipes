<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <div class="q-px-lg q-my-md row justify-between items-center w-100">
          <div class="text-h5">Recipes App</div>
          <div class="text-subtitle1">{{ todaysDate }}</div>
        </div>
        <q-img src="../statics/bg.jpg" class="header-image absolute-top" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="768"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item :to="{ name: 'home' }" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="house" />
            </q-item-section>
            <q-item-section> Home </q-item-section>
          </q-item>

          <q-item
            v-if="$userStore.user"
            :to="{ name: 'todo' }"
            exact
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="style" />
            </q-item-section>
            <q-item-section> ToDo </q-item-section>
          </q-item>

          <q-item
            v-if="$userStore.user"
            :to="{ name: 'profile' }"
            exact
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> Profile </q-item-section>
          </q-item>

          <q-item
            v-if="!$userStore.user"
            :to="{ name: 'auth' }"
            exact
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="key" />
            </q-item-section>
            <q-item-section> Auth </q-item-section>
          </q-item>

          <q-item :to="{ name: 'contact' }" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="mail" />
            </q-item-section>
            <q-item-section> Contact </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        v-if="$userStore.user"
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img
              v-if="user.user_metadata.image"
              :src="
                'https://wgdjvznlohdsepihyodd.supabase.co/storage/v1/object/public/' +
                user.user_metadata.image
              "
            />
            <img v-else src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            {{ user.user_metadata.first_name }}
            {{ user.user_metadata.last_name }}
          </div>
        </div>
      </q-img>
      <q-img
        v-else
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../statics/avatar.png" />
          </q-avatar>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { date } from "quasar";
import { storeToRefs } from "pinia";
import { useUserStore } from "/src/stores/user";

const leftDrawerOpen = ref(false);
const timeStamp = Date.now();
const todaysDate = computed(() => {
  return date.formatDate(timeStamp, "DD MMM");
});
const $userStore = useUserStore();
const { user } = storeToRefs($userStore);
</script>

<style scoped>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>
