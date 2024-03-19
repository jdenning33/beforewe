'use client';
import { IGuest } from '../hooks/useGuests';
import { useState } from 'react';
import { Iq7Dialog } from '@/src/components/Iq7Dialog';
import { EditGuestForm } from './EditGuestForm';

export function EditGuestModal({
    title,
    guest,
    children,
}: {
    title: string;
    guest: Omit<IGuest, 'id'>;
    children?: React.ReactNode | ((openModal: () => void) => React.ReactNode);
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Iq7Dialog isOpen={isModalOpen} onIsOpenChange={setIsModalOpen}>
                <Iq7Dialog.Content2>
                    <Iq7Dialog.Title>{title}</Iq7Dialog.Title>
                    <EditGuestForm
                        guest={guest}
                        afterSave={() => setIsModalOpen(false)}
                    />
                </Iq7Dialog.Content2>
                {typeof children === 'function' ? (
                    children(() => setIsModalOpen(true))
                ) : (
                    <Iq7Dialog.Trigger>{children}</Iq7Dialog.Trigger>
                )}
            </Iq7Dialog>
        </>
    );
}
