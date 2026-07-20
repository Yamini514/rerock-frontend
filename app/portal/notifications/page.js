import { NotificationsClient } from "./NotificationsClient";

export const metadata = {
  title: "Notifications",
  description: "Price alerts, site visit reminders, recommendations, and portfolio updates.",
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
