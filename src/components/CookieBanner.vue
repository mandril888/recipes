<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row no-wrap gap-10">
          <q-avatar icon="cookie" color="primary" text-color="white" />
          <span class="q-ml-sm">
            We use cookies on our website to give you the most relevant
            experience by remembering your preferences and repeat visits. By
            clicking "Accept", you consent to the use of ALL the cookies.
          </span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            label="Reject"
            @click="bannerCookiesClosed"
            color="secondary"
            v-close-popup
          />
          <q-btn
            flat
            label="Accept"
            @click="acceptCookies"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const confirm = ref(false);

if (document.cookie.indexOf("CookieConsentSelected") != "-1") {
  if (document.cookie.indexOf("cookieAnalytics") != "-1") addGtm();
} else confirm.value = true;

function bannerCookiesClosed() {
  setCookie("CookieConsentSelected", true, 365);
}

function acceptCookies() {
  bannerCookiesClosed();
  setCookie("cookieAnalytics", true, 365);
  addGtm();
}

function addGtm() {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-NM32QDF");
}

function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}
</script>
