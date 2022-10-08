<template>
  <q-card class="my-card" flat bordered>
    <q-img :src="recipe.image" />

    <q-card-section>
      <div class="text-overline text-orange-9">
        {{ recipe.cuisines.length ? recipe.cuisines.join(", ") : "Not set" }}
      </div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ recipe.title }}</div>
      <div class="text-caption text-grey-8">
        <div v-html="recipe.summary"></div>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn flat color="dark" label="Share" />
      <q-btn flat color="primary" label="Save" />

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
import { ref, defineProps } from "vue";

const expanded = ref(false);

defineProps({
  recipe: Object,
});
</script>

<style scoped lang="scss">
.my-card {
  width: 100%;
  max-width: 350px;
  margin-bottom: 25px;

  .text-subitle2 {
    color: #353535;

    ol {
      padding-left: 22px;
      margin: 0;
    }
  }
}
</style>
