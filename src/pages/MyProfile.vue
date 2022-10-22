<template>
  <q-page class="q-pa-xl bg-grey-2 column">
    <div class="q-mt-none row justify-between items-center w-100">
      <h4 class="q-mt-none">Profile</h4>
      <a class="text-dec-none" href="#" @click.prevent="signOut">
        <q-icon name="logout" /> Log out
      </a>
    </div>
    <div>
      <div class="q-mb-lg">
        <q-avatar size="156px" class="q-mb-sm">
          <img
            v-if="user.user_metadata.image"
            :src="
              'https://wgdjvznlohdsepihyodd.supabase.co/storage/v1/object/public/' +
              user.user_metadata.image
            "
          />
          <img v-else src="../statics/avatar.png" />
        </q-avatar>
        <q-file
          v-show="editAvatar"
          color="teal"
          filled
          v-model="img"
          label="Avatar image"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" />
          </template>
        </q-file>
        <div class="q-mt-sm">
          <a class="link" v-show="!editAvatar" @click="editAvatar = !editAvatar"
            >Edit</a
          >
          <a
            class="link inline-blocks"
            v-show="editAvatar"
            @click="editAvatar = !editAvatar"
            >Cancel</a
          >
          <a
            class="link inline-blocks q-ml-lg"
            v-show="editAvatar"
            @click="updateAvatar"
            >Save</a
          >
        </div>
      </div>

      <div>
        <p>
          Name: <b>{{ user.user_metadata.first_name }}</b>
          <q-input
            v-show="editData"
            filled
            v-model="name"
            label="Your name"
            hint="Name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </p>
        <p>
          Surname: <b>{{ user.user_metadata.last_name }}</b>
          <q-input
            v-show="editData"
            filled
            v-model="surname"
            label="Your surname"
            hint="Surame"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </p>
        <p>
          Bday: <b>{{ user.user_metadata.b_day }}</b>
          <q-input
            v-show="editData"
            filled
            v-model="date"
            label="Your birthday *"
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
        </p>
        <div>
          <a class="link" v-show="!editData" @click="editData = !editData"
            >Edit</a
          >
          <a
            class="link inline-blocks"
            v-show="editData"
            @click="editData = !editData"
            >Cancel</a
          >
          <a
            class="link inline-blocks q-ml-lg"
            v-show="editData"
            @click="updateData"
            >Save</a
          >
        </div>
      </div>

      <div class="q-mt-lg">
        <a @click="router.push({ name: 'reset' })" class="link"
          >Reset password</a
        >
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
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
const avatarImg = ref("");
const name = ref($userStore.user.user_metadata.first_name);
const surname = ref($userStore.user.user_metadata.last_name);
const date = ref($userStore.user.user_metadata.b_day);
const editData = ref(false);
const img = ref("");
const editAvatar = ref(false);

async function signOut() {
  router.push({ name: "auth" });
  $userStore.signOut();
  $recipesStore.fetchRecipes();
  $q.notify({
    color: "primary",
    textColor: "white",
    icon: "thumbs_up_down",
    message: "Logged out! See you soon 😃",
  });
}

function updateData() {
  if (!name.value || !surname.value || !date.value) {
    $q.notify({
      color: "red-9",
      textColor: "white",
      icon: "warning",
      message: "Fill all inputs 😢",
    });
    return;
  }
  const data = {
    first_name: name.value,
    last_name: surname.value,
    b_day: reverseDate(date.value),
  };
  $userStore
    .updateData(data)
    .then(() => {
      editData.value = false;
      $q.notify({
        color: "primary",
        textColor: "white",
        icon: "cloud_done",
        message: "Update profile!",
      });
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

function updateAvatar() {
  $userStore
    .updateAvatar(img.value)
    .then((data) => {
      editAvatar.value = false;
      $q.notify({
        color: "primary",
        textColor: "white",
        icon: "cloud_done",
        message: "Avatar uploaded!",
      });
      $userStore.updateData({ image: data.Key });
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

function reverseDate(date) {
  return date.split("/").reverse().join("/");
}
</script>

<style scoped lang="scss"></style>
