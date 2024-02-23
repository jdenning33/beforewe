// Assuming IEvent and IUnsavedEvent are defined elsewhere correctly
import React, { createContext, useContext, useEffect, useState } from "react";
import { IEvent, IUnsavedEvent } from "./IEvent";
import { useEvents } from "./useEvents";
import { useParams, useRouter } from "next/navigation";

// Updating the interface to potentially hold a null value for event
interface EventState {
  event: IEvent | IUnsavedEvent;
}

// Define the context with a default value of null for its state
export const EventContext = createContext<EventState | null>(null);

let defaultEvent: IUnsavedEvent = {
  moniker: "",
  fiance_1_name: "",
  fiance_2_name: "",
  primary_date: null,
  target_budget: null,
  event_size: null,
  name: "",
  image_url: "",
  is_public: false,
};

// Define the provider component
export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { events } = useEvents();
  const [activeEvent, setActiveEvent] = useState<IEvent | IUnsavedEvent>(
    defaultEvent
  );
  const { event_accessor } = useParams();
  useEffect(() => {
    decideActiveEvent(events, event_accessor as string);
  }, [events, event_accessor]);

  useEffect(() => {
    decideActiveEvent(events, event_accessor as string);
  }, [events, event_accessor]);

  function decideActiveEvent(
    events: IEvent[],
    event_accessor: number | string
  ) {
    console.log("event_accessor", event_accessor);
    if (event_accessor) {
      let matchingEvent = events.find((e) => e.alias == event_accessor);
      if (matchingEvent) {
        setActiveEvent(matchingEvent);
      } else {
        setActiveEvent({ ...defaultEvent, alias: event_accessor as string });
      }
    } else {
      if (events.length > 0) {
        setActiveEvent(events[0]);
        router.push("/" + events[0].alias);
      } else {
        setActiveEvent(defaultEvent);
      }
    }
  }

  return (
    <EventContext.Provider
      value={{
        event: activeEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Custom hook for consuming the context
export const useEvent = (): EventState => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
