import { defineStore } from "pinia";
import { supabase } from "../supabase/supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password, name, surname, bday) {
      const { user, session, error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
        },
        {
          data: {
            first_name: name,
            last_name: surname,
            b_day: bday,
            image: false,
          },
        }
      );
      if (error) throw error;
      if (user) this.user = user;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else this.fetchUser();
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async resetPasswordForEmail(email) {
      const { data, error } = await supabase.auth.api.resetPasswordForEmail(
        email
      );
      if (error) throw error;
    },
    async updatePassword(newPassword) {
      const { user, error } = await supabase.auth.update({
        password: newPassword,
      });
      if (error) throw error;
      if (user) this.fetchUser();
    },
    async updateData(newData) {
      const { user, error } = await supabase.auth.update({
        data: newData,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async updateAvatar(avatarImg) {
      const { data, error } = await supabase.storage
        .from("avatar")
        .upload("public/" + this.user.id + Date.now() + ".jpg", avatarImg);
      if (error) throw error;
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
