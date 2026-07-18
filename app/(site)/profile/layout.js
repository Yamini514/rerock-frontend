import Image from "next/image";
import { currentUser } from "@/lib/data/profile";
import { ProfileNav } from "./ProfileNav";

export default function ProfileLayout({ children }) {
  return (
    <div className="mx-auto max-w-[90rem] px-6 py-10 md:px-10 md:py-14">
      <div className="mb-10 flex items-center gap-4">
        <span className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image src={currentUser.avatar} alt={currentUser.name} fill sizes="64px" className="object-cover" />
        </span>
        <div>
          <h1 className="font-display text-2xl text-ink md:text-3xl">{currentUser.name}</h1>
          <p className="text-sm text-ink-muted">Member since {currentUser.memberSince}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <ProfileNav />
        <div>{children}</div>
      </div>
    </div>
  );
}
