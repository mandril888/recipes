<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <div class="q-mt-none row justify-between items-center w-100">
      <h4 class="q-mt-none">Profile</h4>
      <a class="text-dec-none" href="#" @click.prevent="logOut">
        <q-icon name="logout" /> Log out
      </a>
    </div>
    <div>
      <p>Name:</p>
      <p>Surname:</p>
      <p>Bday:</p>
      <p>Image:</p>
    </div>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $userStore = useUserStore();
const { user } = storeToRefs($userStore);
const router = useRouter();

console.log(user);

async function logOut() {
  $userStore.logOut();
  $q.notify({
    color: "primary",
    textColor: "white",
    icon: "thumbs_up_down",
    message: "Logged out! See you soon 😃",
  });
  router.push({ name: "home" });
}
</script>

<style scoped lang="scss"></style>
