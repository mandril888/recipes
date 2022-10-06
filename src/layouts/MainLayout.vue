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

          <q-item :to="{ name: 'todo' }" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="style" />
            </q-item-section>
            <q-item-section> ToDo </q-item-section>
          </q-item>

          <q-item :to="{ name: 'auth' }" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> Auth </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Arturo Rubio</div>
          <div>@arubio</div>
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
import EssentialLink from "components/EssentialLink.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  console.log("onMounted");
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      console.log("NO login");
      // redirect them to logout if the user is not there
      router.push({ path: "/auth" });
    } else {
      console.log("YES login");
      // continue to dashboard
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});

const leftDrawerOpen = ref(false);

const timeStamp = Date.now();
const todaysDate = computed(() => {
  return date.formatDate(timeStamp, "DD MMM");
});
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
.w-100 {
  width: 100%;
}
</style>
