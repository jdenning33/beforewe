'use client';
import { IGuest, useGuests } from './useGuests';
import { useMemo } from 'react';

export const useGuestsByGroup = () => {
    const { guests } = useGuests();
    return useMemo(() => {
        const groups: { [id: number]: IGuest[] } = {};
        guests.forEach((guest) => {
            let key = guest.group_id || guest.id;
            if (!groups[key]) groups[key] = [];
            groups[key].push(guest);
        });
        return groups;
    }, [guests]);
};
