<template>
  <q-page class="column">
    <q-tabs v-model="tab" class="text-primary">
      <q-tab name="login" icon="login" label="Log in" />
      <q-tab name="signup" icon="person" label="Sign up" />
    </q-tabs>

    <div v-if="tab === 'login'">
      <SignIn />
    </div>

    <div v-else>
      <SignUp />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import SignUp from "./SignUp.vue";
import SignIn from "./SignIn.vue";
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
