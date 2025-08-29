import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "Hossein",
    email: "hossein@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  }),
  actions: {
    setUser(user: { name: string; email: string; avatar?: string }) {
      this.name = user.name;
      this.email = user.email;
      this.avatar = user.avatar || this.avatar;
    },
  },
});
