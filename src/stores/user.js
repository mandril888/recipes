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
    // async updatePassword(newPassword) {
    //   const { user, error } = await supabase.auth.update({
    //     password: newPassword,
    //   });
    //   if (error) throw error;
    // },
    // async updateMail(newMail) {
    //   const { user, error } = await supabase.auth.update({
    //     email: newMail,
    //   });
    //   if (error) throw error;
    // },
    async updateData(newData) {
      const { user, error } = await supabase.auth.update({
        data: newData,
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
