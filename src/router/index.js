import { createRouter, createWebHistory } from "vue-router";

import NotFoundView from "@/views/NotFoundView.vue";
import HomeView from "@/views/HomeView.vue";
import CreditsView from "@/views/CreditsView.vue";
import DashboardView from "@/views/DashboardView.vue";
import DashboardHome from "@/components/dashboard/DashboardHome.vue";
import GuildView from "@/views/GuildView.vue";
import GuildHome from "@/components/dashboard/guild/GuildHome.vue";
import SettingsView from "@/views/SettingsView.vue";
import SettingsHome from "@/components/dashboard/guild/settings/SettingsHome.vue";
import SettingsPrefix from "@/components/dashboard/guild/settings/SettingsPrefix.vue";
import SettingsWelcome from "@/components/dashboard/guild/settings/SettingsWelcome.vue";
import AnnounceHome from "@/components/dashboard/guild/announce/AnnounceHome.vue";

const router = createRouter({
  history: createWebHistory(),
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
            {
              name: "announce-home",
              path: "announce",
              component: AnnounceHome,
            },
            {
              name: "guild-settings",
              path: "settings",
              component: SettingsView,
              children: [
                {
                  name: "settings-home",
                  path: "",
                  component: SettingsHome,
                },
                {
                  name: "settings-prefix",
                  path: "prefix",
                  component: SettingsPrefix,
                },
                {
                  name: "settings-welcome",
                  path: "welcome",
                  component: SettingsWelcome,
                },
              ],
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
