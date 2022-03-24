import { createRouter, createWebHistory } from "vue-router";

import NotFoundView from "@/views/NotFoundView.vue";
import HomeView from "@/views/HomeView.vue";
import CreditsView from "@/views/CreditsView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DashboardHome from "@/components/dashboard/DashboardHome.vue";
import GuildView from "@/views/GuildView.vue";
import GuildHome from "@/components/dashboard/guild/GuildHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/attribution",
      name: "attribution",
      component: CreditsView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      children: [
        {
          name: "dashboard-home",
          path: "",
          component: DashboardHome,
        },
        {
          name: "guild",
          path: ":id",
          component: GuildView,
          children: [
            {
              name: "guild-home",
              path: "",
              component: GuildHome,
            },
          ],
        },
      ],
    },
    {
      name: "not-found",
      path: "/:pathMatch(.*)*",
      component: NotFoundView,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: "smooth",
          });
        }, 100);
      });
    }
  },
});

export default router;
