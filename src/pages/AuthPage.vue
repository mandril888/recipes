<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none">Sign up</h4>
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
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
        type="number"
        v-model="age"
        label="Your age *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your age',
          (val) => (val > 0 && val < 100) || 'Please type a real age',
        ]"
      />

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
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const name = ref("");
const age = ref("");
const password = ref("");
const isPwd = ref(true);
const accept = ref(false);

function onSubmit() {
  console.log(name.value, age.value, accept.value);
  name.value = age.value = "";
  accept.value = false;

  $q.notify({
    message: "Success form",
    color: "primary",
  });
}
</script>
