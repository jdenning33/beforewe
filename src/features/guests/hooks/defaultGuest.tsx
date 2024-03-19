'use client';
import { IGuest } from './useGuests';

export const defaultGuest: Omit<IGuest, 'id'> = {
    first_name: '',
    last_name: '',
    relationship: 'Family',
    should_invite_score: 3,
};
