<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <h4 class="q-mt-none">Reset password</h4>

    <q-form @submit.prevent="onSubmit" class="q-gutter-md">
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
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { useRouter } from "vue-router";

const $userStore = useUserStore();
const router = useRouter();

const $q = useQuasar();
const password = ref("");
const isPwd = ref(true);

async function onSubmit() {
  if ($userStore) {
    $userStore
      .updatePassword(password.value)
      .then(() => {
        $q.notify({
          color: "primary",
          textColor: "white",
          icon: "cloud_done",
          message: "Password reset! 😃",
        });
        router.push({ name: "profile" });
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
}
</script>

<style scoped lang="scss"></style>
