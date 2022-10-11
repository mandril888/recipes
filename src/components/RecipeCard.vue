<template>
  <q-card class="my-card" flat bordered>
    <q-img :src="recipe.image" />

    <q-card-section>
      <div class="text-overline text-orange-9">
        Cat:
        {{ recipe.cuisines.length ? recipe.cuisines.join(", ") : "Not set" }}
      </div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ recipe.title }}</div>
      <div class="text-caption text-grey-8">
        <div v-html="recipe.summary"></div>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn flat round color="primary" icon="share" />
      <q-btn flat round color="teal" icon="bookmark" @click="addToDo" />

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          <div v-html="recipe.instructions"></div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "/src/stores/user";
import { supabase } from "../supabase/supabase";

const $userStore = useUserStore();
const $q = useQuasar();
const expanded = ref(false);

async function addToDo() {
  const { data, err } = await supabase.from("recipes").insert([
    {
      user_id: $userStore.user.id,
      recipe_id: props.recipe.id,
    },
  ]);
  if (err) throw err;
  if (data) {
    $q.notify({
      color: "primary",
      textColor: "white",
      icon: "maps_ugc",
      message: "Recipe added 😃",
    });
  }
}

const props = defineProps({
  recipe: Object,
});
</script>

<style lang="scss">
.my-card {
  .text-subitle2 {
    color: #353535;
  }

  ol {
    padding-left: 22px;
    margin: 0;
  }
}
</style>
