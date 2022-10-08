import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      console.log("fetchUser()");
      const user = await supabase.auth.user();
      if (user) {
        this.user = user;
      }
    },
    async signUp(email, password) {
      console.log("signUp()");
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async logOut() {
      console.log("logOut()");
      supabase.auth.signOut().catch((err) => {
        console.log(err);
      });
      localStorage.removeItem("user");
    },
    async logIn(email, password) {
      console.log("logIn()");
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
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
