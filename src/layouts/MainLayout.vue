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
        <div class="q-pl-lg q-my-sm row justify-between items-center w-100">
          <h1 class="text-h4 q-ma-none">
            <q-item
              class="text-white q-pl-none"
              :to="{ name: 'home' }"
              exact
              clickable
              v-ripple
            >
              <q-item-section> Menueat </q-item-section>
            </q-item>
          </h1>
          <div class="logo-container text-h5 fs-custom row gap-10">
            <img alt="Menueat" src="../statics/brocoli.png" />
          </div>
        </div>
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

        <div
          class="absolute-bottom text-center fs-custom q-mb-md text-secondary text-h6"
        >
          <p>{{ todaysDate }}</p>
        </div>
      </q-scroll-area>

      <q-img class="absolute-top bg-secondary" style="height: 150px">
        <div
          class="absolute-full bg-transparent column justify-center items-center"
        >
          <q-avatar size="75px" class="q-mb-sm">
            <img
              v-if="$userStore.user"
              :src="
                user.user_metadata.image
                  ? 'https://wgdjvznlohdsepihyodd.supabase.co/storage/v1/object/public/' +
                    user.user_metadata.image
                  : 'https://cdn.quasar.dev/img/boy-avatar.png'
              "
            />
            <img v-else src="../statics/avatar.png" />
          </q-avatar>
          <div v-if="$userStore.user">
            {{ user.user_metadata.first_name }}
            {{ user.user_metadata.last_name }}
          </div>
          <div v-else>
            <q-btn
              flat
              round
              color="white"
              label="Log in"
              :to="{ name: 'auth' }"
            />
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
      <CookieBanner />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { date } from "quasar";
import { storeToRefs } from "pinia";
import { useUserStore } from "/src/stores/user";
import CookieBanner from "../components/CookieBanner.vue";

const leftDrawerOpen = ref(false);
const timeStamp = Date.now();
const todaysDate = computed(() => {
  return date.formatDate(timeStamp, "D MMM");
});
const $userStore = useUserStore();
const { user } = storeToRefs($userStore);
</script>

<style scoped lang="scss">
.logo-container {
  border: 1px solid;
  border-radius: 50%;
  padding: 6px;
  background: #f5ca24;

  img {
    max-width: 35px;
  }
}
</style>
