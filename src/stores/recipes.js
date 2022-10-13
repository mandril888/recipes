import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: null,
  }),
  actions: {
    async fetchRecipes(userId) {
      if (!userId) this.recipes = null;
      const { data, err } = await supabase
        .from("recipes")
        .select()
        .eq("user_id", userId);
      if (err) throw err;
      if (data) this.recipes = data;
    },
    async deleteRecipe(recipeId) {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("user_id", this.user.id)
        .eq("recipe_id", recipeId);
      if (error) throw error;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "recipes",
        storage: localStorage,
      },
    ],
  },
});
