'use client';
import {
    Iq7Button,
    Iq7OutlineButton,
    Iq7PrimaryButton,
} from '@/src/components/Iq7Button';
import { Iq7Input, Iq7Select } from '@/src/components/Iq7Input';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { IFundingSource } from '@/src/features/budget-funds/hooks/IFundingSource';
import { useFundingSources } from '@/src/features/budget-funds/hooks/useFundingSources';
import { use, useState } from 'react';

export function EditFundingSourcePanel({
    fundSource,
    afterSave,
}: {
    fundSource: IFundingSource | null;
    afterSave?: () => void;
}) {
    const { saveFundingSource: addFundingSource } = useFundingSources();
    const [useRecurrence, setUseRecurrence] = useState(
        fundSource?.use_recurrence || false
    );
    const { handleSubmit, control, register } = useForm<IFundingSource>({
        defaultValues: {
            ...fundSource,
            recurrence: fundSource?.recurrence || 1,
            recurrence_unit: fundSource?.recurrence_unit || 'month',
            takeEffectDate:
                fundSource?.takeEffectDate?.format('YYYY-MM-DD') ||
                dayjs().format('YYYY-MM-DD'),
            recurrence_end: fundSource?.recurrence_end?.format('YYYY-MM-DD'),
        },
        mode: 'onChange',
    });

    function onSubmit(data: IFundingSource) {
        console.log(data);
        addFundingSource({
            ...data,
            use_recurrence: useRecurrence,
            takeEffectDate: data.takeEffectDate
                ? dayjs(data.takeEffectDate)
                : undefined,
            recurrence_end: data.recurrence_end
                ? dayjs(data.recurrence_end)
                : undefined,
        });
        afterSave?.();
    }

    return (
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Iq7Input
                    label='Name'
                    placeholder='Name'
                    name='name'
                    control={control}
                    rules={{
                        required: true,
                    }}
                />
            </div>
            <div className='flex gap-2'>
                <Iq7Input
                    inputClassName='w-full'
                    label='Amount'
                    type='number'
                    placeholder='Amount'
                    name='amount'
                    control={control}
                    rules={{
                        required: true,
                    }}
                />
                <Iq7Input
                    label='Available'
                    placeholder='Now'
                    type='date'
                    name='takeEffectDate'
                    control={control}
                    rules={{
                        required: true,
                    }}
                />
            </div>
            <Iq7OutlineButton
                className='m-4 mb-2'
                onClick={(e) => {
                    e.preventDefault();
                    setUseRecurrence(!useRecurrence);
                }}
            >
                {useRecurrence ? 'Remove Recurrence' : 'Add Recurrence'}
            </Iq7OutlineButton>
            {useRecurrence && (
                <>
                    <div className='flex items-end gap-2'>
                        <Iq7Input
                            label='Recur every '
                            inputClassName='w-full'
                            type='number'
                            placeholder='Recurrence'
                            name='recurrence'
                            rules={{
                                min: 1,
                                required: useRecurrence,
                            }}
                            control={control}
                        />
                        <Iq7Select
                            name='recurrence_unit'
                            className='flex-auto shrink-0'
                            inputClassName='w-full'
                            control={control}
                            rules={{
                                required: useRecurrence,
                            }}
                        >
                            <Iq7Select.Option value=''>None</Iq7Select.Option>
                            <Iq7Select.Option value='day'>Day</Iq7Select.Option>
                            <Iq7Select.Option value='week'>
                                Week
                            </Iq7Select.Option>
                            <Iq7Select.Option value='month'>
                                Month
                            </Iq7Select.Option>
                            <Iq7Select.Option value='year'>
                                Year
                            </Iq7Select.Option>
                        </Iq7Select>
                        <Iq7Input
                            className='w-full'
                            inputClassName='w-full'
                            label='Until'
                            type='date'
                            name='recurrence_end'
                            control={control}
                        />
                    </div>
                </>
            )}
            <div className='flex-1 h-full'></div>
            <div className='flex justify-center mt-4'>
                <Iq7PrimaryButton>Save</Iq7PrimaryButton>
            </div>
        </form>
    );
}
