"use client";

import { EventDetailsPanel } from "./features/event-details/EventDetailsPanel";
import { BudgetOverviewPanel } from "./features/budget/BudgetOverviewPanel";
import { Iq7Card } from "./components/Iq7Card";
import { useEvent } from "./features/event-details/hooks/useEvent";
import EventHomePage from "./[event_accessor]/page";

export default function Home() {
  return <EventHomePage />;
}
