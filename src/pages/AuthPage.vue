<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <q-tabs v-model="tab" class="text-teal">
      <q-tab name="login" icon="login" label="Log in" />
      <q-tab name="signup" icon="person" label="Sign up" />
    </q-tabs>

    <div v-if="tab === 'login'">
      <LogIn />
    </div>

    <div v-else>
      <SignUp />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import SignUp from "./SignUp.vue";
import LogIn from "./LogIn.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const tab = ref("login");

if (router.currentRoute._value.redirectedFrom) {
  $q.notify({
    color: "red-9",
    textColor: "white",
    icon: "warning",
    message: "You need to be logged to access previous page 😢",
  });
}
</script>

<style scoped>
form {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
</style>
