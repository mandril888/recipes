import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if (user) this.user = user;
    },
    async signUp(email, password, name, surname, bday) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: name,
            last_name: surname,
          },
        },
      });
      if (error) throw error;
      if (user) {
        this.user = user;
      }
    },
    async logOut() {
      supabase.auth.signOut();
      localStorage.removeItem("user");
    },
    async logIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async getRecipes() {
      const { data, err } = await supabase
        .from("recipes")
        .select()
        .eq("user_id", this.user.id);
      if (err) throw err;
      if (data) return data;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
