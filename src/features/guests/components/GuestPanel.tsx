'use client';
import { IGuest, useGuests } from '../hooks/useGuests';
import { Iq7FormInput } from '@/src/components/Form/Iq7FormInput';
import { useForm } from 'react-hook-form';
import { Iq7OutlineButton, Iq7PrimaryButton } from '@/src/components/Iq7Button';
import { Iq7FormSelect } from '@/src/components/Form/Iq7FormSelect';
import { likelyToInviteOptions } from './GuestColumns';
import { EditGuestForm } from './EditGuestForm';
import { useState } from 'react';

export function GuestPanel({ guest }: { guest: IGuest }) {
    const [isEditingGuest, setIsEditingGuest] = useState(false);

    return (
        <div>
            Details
            <div className='bg-white p-2'>
                {isEditingGuest ? (
                    <EditGuestForm
                        guest={guest}
                        afterSave={() => setIsEditingGuest(false)}
                    />
                ) : (
                    <div className='flex justify-between items-center'>
                        <div className='w-full flex flex-col gap-2'>
                            <div className='font-medium'>
                                {guest.first_name} {guest.last_name}
                            </div>
                            <div className='flex gap-2 items-center'>
                                <RelationshipIcon className='w-4 h-4' />
                                {guest.relationship}
                            </div>
                            <div className='flex w-full items-center'>
                                <div className='flex-1 flex gap-2'>
                                    <EmailIcon className='w-4 h-4' />
                                    {guest.email}
                                </div>
                                <div className='flex-1 flex gap-2 items-center'>
                                    <PhoneIcon className='w-4 h-4' />
                                    {guest.phone_number}
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <Iq7OutlineButton
                                onClick={() =>
                                    setIsEditingGuest(!isEditingGuest)
                                }
                            >
                                Edit
                            </Iq7OutlineButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function RelationshipIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            fill='#000000'
        >
            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
            <g
                id='SVGRepo_tracerCarrier'
                stroke-linecap='round'
                stroke-linejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
                <path
                    d='M895.3 278.8L529.6 77.7c-11-6.1-24.3-6-35.2 0l-154.5 85c-13.4-9.4-29.7-15-47.3-15-45.4 0-82.3 36.9-82.3 82.3s36.9 82.3 82.3 82.3 82.3-36.9 82.3-82.3c0-1 0-2-0.1-3L512 151.4l329.1 181v359L512 872.6l-329.1-181V445.9l292.6 92.9v82.4c-27.1 13.5-45.7 41.4-45.7 73.7 0 45.4 36.9 82.3 82.3 82.3s82.3-36.9 82.3-82.3c0-32.2-18.6-60.2-45.7-73.7v-87.7l81.7-45.4c13.2 8.9 29 14.2 46.1 14.2 45.4 0 82.3-36.9 82.3-82.3s-36.9-82.3-82.3-82.3-82.3 36.9-82.3 82.3c0 1.5 0 3 0.1 4.5L508 472.4 157.4 361c-11.1-3.5-23.2-1.6-32.7 5.3-9.4 6.9-15 17.9-15 29.5v317.3c0 13.3 7.3 25.6 18.9 32l365.7 201.1c5.5 3 11.6 4.5 17.6 4.5s12.1-1.5 17.6-4.5l365.7-201.1c11.7-6.4 18.9-18.7 18.9-32V310.9c0.2-13.4-7.1-25.7-18.8-32.1z m-602.7-21.4c-15.1 0-27.4-12.3-27.4-27.4s12.3-27.4 27.4-27.4S320 214.9 320 230s-12.3 27.4-27.4 27.4z m383.8 135.2c15.1 0 27.4 12.3 27.4 27.4s-12.3 27.4-27.4 27.4S649 435.1 649 420s12.3-27.4 27.4-27.4zM512 722.3c-15.1 0-27.4-12.3-27.4-27.4s12.3-27.4 27.4-27.4 27.4 12.3 27.4 27.4-12.3 27.4-27.4 27.4z'
                    fill='#0F1F3C'
                ></path>
            </g>
        </svg>
    );
}

function EmailIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
            <g
                id='SVGRepo_tracerCarrier'
                stroke-linecap='round'
                stroke-linejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
                {' '}
                <path
                    d='M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16'
                    stroke='#000000'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                ></path>{' '}
            </g>
        </svg>
    );
}

function PhoneIcon({ className }: { className?: string }) {
    return (
        <svg
            className={'rotate-30 ' + className}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
            <g
                id='SVGRepo_tracerCarrier'
                stroke-linecap='round'
                stroke-linejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
                {' '}
                <path
                    d='M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z'
                    fill='#1C274C'
                ></path>{' '}
            </g>
        </svg>
    );
}
