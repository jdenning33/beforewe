'use client';
import { IGuest, useGuests } from './useGuests';
import { useMemo } from 'react';

export const useGuestsByGroup = () => {
    const { guests } = useGuests();
    const guestsByGroup = useMemo(() => {
        const groups: { [id: number]: IGuest[] } = {};
        guests.forEach((guest) => {
            let key = guest.group_id || guest.id;
            if (!groups[key]) groups[key] = [];
            groups[key].push(guest);
        });
        return groups;
    }, [guests]);

    return guestsByGroup;
};

export type GuestGroup = { groupId: number; guests: IGuest[] };
export const useGuestsByGroupList = (): GuestGroup[] => {
    const { guests } = useGuests();
    const guestsByGroup = useMemo(() => {
        const groups: { [id: number]: IGuest[] } = {};
        guests.forEach((guest) => {
            let key = guest.group_id || guest.id;
            if (!groups[key]) groups[key] = [];
            groups[key].push(guest);
        });
        return groups;
    }, [guests]);

    return Object.entries(guestsByGroup).map(([groupId, groupGuests]) => ({
        groupId: +groupId,
        guests: groupGuests,
    }));
};
