<template>
  <q-page class="column">
    <h4 class="q-mt-none">Contact</h4>

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      name="contact"
      method="post"
      class="q-gutter-md"
      data-netlify="true"
      netlify-honeypot="bot-field"
      data-netlify-recaptcha="true"
      ref="contactForm"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input name="bot-field" hidden />
      <q-input
        filled
        v-model="name"
        label="Your full name *"
        hint="Name and surname"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type something',
          (val) =>
            (val.split(' ').length > 1 && val.split(' ')[1].length > 1) ||
            'Enter name and surmane',
        ]"
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
        v-model="message"
        label="Message *"
        type="textarea"
        hint="Explain us your problem"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div data-netlify-recaptcha="true"></div>

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
import { useRouter } from "vue-router";

const $q = useQuasar();
const name = ref("");
const email = ref("");
const message = ref("");
const accept = ref(false);
const myForm = ref(null);
const router = useRouter();

async function onSubmit() {
  if (!accept.value) {
    $q.notify({
      color: "red-9",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first 😢",
    });
  } else {
    const formData = {
      "form-name": "contact",
      name: name.value,
      email: email.value,
      message: message.value,
    };
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        $q.notify({
          color: "primary",
          textColor: "white",
          icon: "mark_email_read",
          message: "Submitted! We will contact you soon 😃",
        });
        router.push({ name: "home" });
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

function onReset() {
  name.value = null;
  email.value = null;
  message.value = null;
  accept.value = false;
}
</script>
