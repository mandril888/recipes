import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: null,
  }),
  actions: {
    async fetchRecipes(userId) {
      if (!userId) return (this.recipes = null);
      const { data, error } = await supabase
        .from("recipes")
        .select()
        .eq("user_id", userId);
      if (data) this.recipes = data.sort((a, b) => a.id - b.id);
      if (error) throw error;
    },
    async addToDoRecipe(userId, recipe) {
      const { data, error } = await supabase.from("recipes").insert([
        {
          user_id: userId,
          recipe_title: recipe.title,
          recipe_id: recipe.id,
          recipe_img: recipe.image,
        },
      ]);
      if (error) throw error;
    },
    async deleteRecipe(userId, recipeId) {
      const { data, error } = await supabase
        .from("recipes")
        .delete()
        .match({ user_id: userId, recipe_id: recipeId });
      if (error) throw error;
    },
    async doneUndoneTask(userId, recipeId, isComplete) {
      const { data, error } = await supabase
        .from("recipes")
        .update({ is_complete: isComplete })
        .match({ user_id: userId, recipe_id: recipeId });
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
