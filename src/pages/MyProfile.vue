<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none">Profile</h4>
    <a href="#" @click.prevent="logOut">logOut</a>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "/src/stores/user";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

async function logOut() {
  await userStore.logOut();
}
</script>
