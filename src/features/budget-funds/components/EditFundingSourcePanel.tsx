'use client';
import {
    Iq7Button,
    Iq7GhostButton,
    Iq7OutlineButton,
    Iq7PrimaryButton,
} from '@/src/components/Iq7Button';
import { Iq7FormInput } from '@/src/components/Form/Iq7FormInput';
import { Iq7FormSelect } from '@/src/components/Form/Iq7FormSelect';
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
    const { saveFundingSource, deleteFundingSource } = useFundingSources();
    const [useRecurrence, setUseRecurrence] = useState(
        fundSource?.use_recurrence || false
    );
    const { handleSubmit, control, register } = useForm<IFundingSource>({
        defaultValues: {
            ...fundSource,
            recurrence: Number(fundSource?.recurrence || 1),
            amount: Number(fundSource?.amount || 0),
            recurrence_unit: fundSource?.recurrence_unit || 'month',
            take_effect_date:
                fundSource?.take_effect_date?.format('YYYY-MM-DD') ||
                dayjs().format('YYYY-MM-DD'),
            recurrence_end: fundSource?.recurrence_end?.format('YYYY-MM-DD'),
        },
        mode: 'onChange',
    });

    function onSubmit(data: IFundingSource) {
        console.log(data);
        saveFundingSource({
            ...data,
            use_recurrence: useRecurrence,
            amount: Number(data.amount),
            recurrence: Number(data.recurrence),
            take_effect_date: data.take_effect_date
                ? dayjs(data.take_effect_date)
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
                <Iq7FormInput
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
                <Iq7FormInput
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
                <Iq7FormInput
                    label='Available'
                    type='date'
                    name='take_effect_date'
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
                        <Iq7FormInput
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
                        <Iq7FormSelect
                            name='recurrence_unit'
                            className='flex-auto shrink-0'
                            inputClassName='w-full'
                            control={control}
                            rules={{
                                required: useRecurrence,
                            }}
                        >
                            <Iq7FormSelect.Option value=''>
                                None
                            </Iq7FormSelect.Option>
                            <Iq7FormSelect.Option value='day'>
                                Day
                            </Iq7FormSelect.Option>
                            <Iq7FormSelect.Option value='week'>
                                Week
                            </Iq7FormSelect.Option>
                            <Iq7FormSelect.Option value='month'>
                                Month
                            </Iq7FormSelect.Option>
                            <Iq7FormSelect.Option value='year'>
                                Year
                            </Iq7FormSelect.Option>
                        </Iq7FormSelect>
                        <Iq7FormInput
                            label='Until'
                            placeholder='forever'
                            type='date'
                            name='recurrence_end'
                            control={control}
                        />
                    </div>
                </>
            )}
            <div className='flex-1 h-full'></div>
            <div className='flex mt-4'>
                <div className='flex-1'></div>
                <Iq7PrimaryButton>Save</Iq7PrimaryButton>
                <div className='flex-1'>
                    {fundSource && (
                        <Iq7GhostButton
                            onClick={(_) => deleteFundingSource(fundSource.id)}
                        >
                            Delete Funding Source
                        </Iq7GhostButton>
                    )}
                </div>
            </div>
        </form>
    );
}
