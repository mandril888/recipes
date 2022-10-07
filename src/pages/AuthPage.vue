<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none">Sign up</h4>
    <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

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
        v-model="date"
        label="Enter your birthday *"
        mask="date"
        hint="YYYY/MM/DD"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        filled
        v-model="password"
        label="Add strong password *"
        :type="isPwd ? 'password' : 'text'"
        hint="Password"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
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

      <q-input
        filled
        v-model="passwordConfirm"
        label="Verify password typed *"
        :type="isPwd2 ? 'password' : 'text'"
        hint="Password verification"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
          (val) => val === password || 'Passwords not equals',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd2 = !isPwd2"
          />
        </template>
      </q-input>

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";

const $q = useQuasar();
const name = ref("");
const email = ref("");
const date = ref("");
const password = ref("");
const isPwd = ref(true);
const passwordConfirm = ref("");
const isPwd2 = ref(true);
const accept = ref(false);

function onSubmit() {
  if (!accept.value) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "primary",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
    // await useUserStore.signUp('arturo.rubio.89.8@gmail.com', 'password123')
  }
}

function onReset() {
  name.value = null;
  age.value = null;
  password.value = null;
  isPwd.value = false;
  passwordConfirm.value = null;
  isPwd2.value = false;
  accept.value = false;
}
</script>

<style scoped>
form {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
</style>
