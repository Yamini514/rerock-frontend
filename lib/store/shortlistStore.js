import { create } from "zustand";
import { persist } from "zustand/middleware";

export const SHORTLIST_LIMIT = 2;

export const useShortlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      isSaved: (slug) => get().items.some((i) => i.slug === slug),

      add: (property) => {
        const { items } = get();
        if (items.some((i) => i.slug === property.slug)) return true;
        if (items.length >= SHORTLIST_LIMIT) return false;
        set({
          items: [
            ...items,
            { slug: property.slug, title: property.title, image: property.images?.[0] || property.image, price: property.price },
          ],
        });
        return true;
      },

      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),

      toggle: (property) => {
        if (get().isSaved(property.slug)) {
          get().remove(property.slug);
          return true;
        }
        return get().add(property);
      },
    }),
    { name: "rerock_shortlist" }
  )
);
