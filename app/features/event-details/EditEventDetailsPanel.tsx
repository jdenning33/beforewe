import { useEvent } from "./hooks/useEvent";
import moment from "moment";
import { useState } from "react";
import { PersonIcon } from "@/app/components/icons/PersonIcon";

import { useForm, SubmitHandler, set } from "react-hook-form";
import { Iq7Input } from "@/app/components/Iq7Input";
import { IEvent, IUnsavedEvent } from "./hooks/IEvent";
import { randomUUID } from "crypto";
import { useEvents } from "./hooks/useEvents";
import { after } from "node:test";
import { useAuthUser } from "../user/hooks/useAuthUser";
import { useRouter } from "next/navigation";

export function EditEventDetailsPanel({
  className,
  afterSave,
}: {
  afterSave: () => void;
  className?: string;
}) {
  const router = useRouter();
  const { isSignedIn } = useAuthUser();
  const { event } = useEvent();
  const { saveEvent, deleteEvent } = useEvents();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEvent>({
    defaultValues: {
      ...event,
      primary_date: event.primary_date?.format("YYYY-MM-DD"),
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IEvent> = async (data) => {
    let newEvent: IUnsavedEvent = {
      ...event,
      fiance_1_name: data.fiance_1_name,
      fiance_2_name: data.fiance_2_name,
      primary_date: data.primary_date ? moment(data.primary_date) : null,
      name: event.name
        ? event.name
        : data.fiance_1_name + " & " + data.fiance_2_name,
      alias: data.alias,
      is_public: isSignedIn ? false : true,
    };
    try {
      await saveEvent(newEvent);
      afterSave();
      router.push("/" + newEvent.alias);
    } catch (e: any) {
      alert("Error saving event: " + e.message);
      console.error("asdf", e);
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 items-center justify-between h-full"
    >
      <div className="flex gap-2 items-end">
        <div className="flex flex-col items-center">
          <PersonIcon className="h-32" />

          <Iq7Input
            inputClassName="text-center"
            placeholder="Fiance Name"
            name="fiance_1_name"
            control={control}
            rules={{ required: true }}
          />
        </div>
        <div className="text-xl font-medium">&</div>
        <div className="flex flex-col items-center">
          <PersonIcon className="h-32" />

          <Iq7Input
            inputClassName="text-center"
            placeholder="Fiance Name"
            name="fiance_2_name"
            control={control}
            rules={{ required: true }}
          />
        </div>
      </div>

      <div className="font-medium">ARE GETTING MARRIED</div>

      <Iq7Input
        placeholder="Wedding Date"
        type="date"
        name="primary_date"
        control={control}
        rules={{ required: true }}
      />

      <div className="flex w-full">
        {event.id ? (
          <>
            <div className="flex-1"></div>
            <button className="btn btn-sm btn-primary w-fit" type="submit">
              Save Event
            </button>
            <div className="flex-1 flex justify-end">
              <button
                className="btn btn-sm btn-primary btn-ghost w-fit"
                onClick={async (e) => afterSave()}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary btn-ghost w-fit hidden"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    await deleteEvent(event as IEvent);
                    afterSave();
                  } catch (e: any) {
                    alert("Error deleting event: " + e.message);
                  }
                }}
              >
                Delete Event
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 flex items-center gap-2 justify-center">
              beforewe.co/
              <Iq7Input
                placeholder=""
                name="alias"
                control={control}
                rules={{ required: true }}
              />
              <button className="btn btn-sm btn-primary w-fit" type="submit">
                {event.id ? "Save Event" : "Create Event"}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

export function Countdown() {
  const { event } = useEvent();
  if (!event.primary_date) return null;
  const daysUntilEvent = Math.max(
    event.primary_date?.diff(moment(), "days"),
    0
  );
  return (
    <div className="font-mono text-5xl">
      <span className="mr-2">{daysUntilEvent}</span>
      days
    </div>
  );
}

export function EventAlias() {
  const { event } = useEvent();
  return (
    <div className="flex flex-col">
      <span className="text-sm">beforewe.co/{event.alias}</span>
    </div>
  );
}
