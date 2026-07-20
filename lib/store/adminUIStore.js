import { create } from "zustand";
import { persist } from "zustand/middleware";

const RECENTS_LIMIT = 6;

export const useAdminUIStore = create(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      favorites: [],
      recents: [],
      collapsedGroups: [],

      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      toggleFavorite: (href) =>
        set((s) => ({
          favorites: s.favorites.includes(href) ? s.favorites.filter((h) => h !== href) : [...s.favorites, href],
        })),

      pushRecent: (href) =>
        set((s) => ({
          recents: [href, ...s.recents.filter((h) => h !== href)].slice(0, RECENTS_LIMIT),
        })),

      toggleGroup: (label) =>
        set((s) => ({
          collapsedGroups: s.collapsedGroups.includes(label)
            ? s.collapsedGroups.filter((l) => l !== label)
            : [...s.collapsedGroups, label],
        })),

      isGroupCollapsed: (label) => get().collapsedGroups.includes(label),
    }),
    { name: "rerock_admin_ui" }
  )
);
