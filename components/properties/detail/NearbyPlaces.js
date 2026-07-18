import { Building2, GraduationCap, HeartPulse, ShoppingBag, TrainFront, MapPinned } from "lucide-react";

const iconFor = {
  School: GraduationCap,
  Hospital: HeartPulse,
  Metro: TrainFront,
  Mall: ShoppingBag,
  "IT Park": Building2,
};

export function NearbyPlaces({ places }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {places.map((place) => {
        const Icon = iconFor[place.category] || MapPinned;
        return (
          <div key={place.name} className="flex items-center gap-4 rounded-2xl border border-border p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{place.category}</p>
              <p className="text-sm font-medium text-ink">{place.name}</p>
            </div>
            <span className="ml-auto shrink-0 font-tabular text-sm font-semibold text-ink-muted">{place.distanceKm} km</span>
          </div>
        );
      })}
    </div>
  );
}
