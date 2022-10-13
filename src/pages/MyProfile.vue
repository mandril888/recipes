<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <div class="q-mt-none row justify-between items-center w-100">
      <h4 class="q-mt-none">Profile</h4>
      <a class="text-dec-none" href="#" @click.prevent="signOut">
        <q-icon name="logout" /> Log out
      </a>
    </div>
    <div>
      <div v-if="user.user_metadata.image"></div>
      <p>
        Name: <b>{{ user.user_metadata.first_name }}</b>
      </p>
      <p>
        Surname: <b>{{ user.user_metadata.last_name }}</b>
      </p>
      <p>
        Bday: <b>{{ user.user_metadata.b_day }}</b>
      </p>
    </div>
  </q-page>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { useRecipesStore } from "/src/stores/recipes";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $userStore = useUserStore();
const $recipesStore = useRecipesStore();
const { user } = storeToRefs($userStore);
const router = useRouter();

async function signOut() {
  $userStore.signOut();
  $recipesStore.fetchRecipes();
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
