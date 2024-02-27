'use client';
import { useEffect, useState } from 'react';
import { Iq7Dialog } from '@/src/components/Iq7Dialog';
import { EditFundingSourcePanel } from './EditFundingSourcePanel';
import { IFundingSource } from '../hooks/IFundingSource';
import { on } from 'events';

export function EditFundingSourceModal({
    isOpen,
    onIsOpenChange,
    fundingSource,
    children,
}: {
    isOpen?: boolean;
    onIsOpenChange?: (isOpen: boolean) => void;
    fundingSource: IFundingSource | null;
    children?: React.ReactNode;
}) {
    const [open, setOpen] = useState(isOpen || false);

    useEffect(() => {
        setOpen(isOpen || false);
    }, [isOpen]);

    return (
        <>
            <Iq7Dialog
                isOpen={open}
                onIsOpenChange={(o) => {
                    setOpen(o);
                    onIsOpenChange?.(o);
                }}
            >
                <Iq7Dialog.Trigger>{children}</Iq7Dialog.Trigger>
                <Iq7Dialog.Portal>
                    <Iq7Dialog.Overlay />
                    <Iq7Dialog.Content>
                        <Iq7Dialog.Title>
                            {fundingSource?.id ? 'Edit' : 'New'} Funding Source
                        </Iq7Dialog.Title>
                        <EditFundingSourcePanel
                            fundSource={fundingSource}
                            afterSave={() => {
                                setOpen(false);
                                onIsOpenChange?.(false);
                            }}
                        />
                    </Iq7Dialog.Content>
                </Iq7Dialog.Portal>
            </Iq7Dialog>
        </>
    );
}
