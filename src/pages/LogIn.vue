<template>
  <h4 class="q-mt-none">Log in</h4>

  <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      v-model="email"
      label="Your email *"
      type="email"
      hint="Email"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'Please type something',
        (val) =>
          val.match(
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) || 'Please type a real mail',
      ]"
    />

    <q-input
      filled
      v-model="password"
      label="Password *"
      :type="isPwd ? 'password' : 'text'"
      hint="Password"
      lazy-rules
      :rules="[
        (val) => (val !== null && val !== '') || 'Enter a strong password',
        (val) =>
          val.length > 9 || 'Password should contain at least 10 characters',
        (val) =>
          val.match(
            /^(?=.*[0-9])(?=.*[a-zñ])(?=.*[A-ZÑ])([a-zA-Z0-9]{10,})$/
          ) ||
          'Password should contain at least one digit, one lower case and one uppper case',
      ]"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const $q = useQuasar();
const email = ref("");
const password = ref("");
const isPwd = ref(true);

async function onSubmit() {
  userStore
    .logIn(email.value, password.value)
    .then(() => {
      $q.notify({
        color: "primary",
        textColor: "white",
        icon: "cloud_done",
        message: "Logged in! 😃",
      });
      router.push({ path: "/" });
    })
    .catch((err) => {
      $q.notify({
        color: "red-9",
        textColor: "white",
        icon: "warning",
        message: `${err.message} 😢`,
      });
    });
}

function onReset() {
  email.value = null;
  password.value = null;
  isPwd.value = true;
}
</script>
