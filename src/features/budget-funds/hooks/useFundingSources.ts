'use client';
import { create } from 'zustand';
import { IFundingSource } from '@/src/features/budget-funds/hooks/IFundingSource';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import dayjs from 'dayjs';

export const useFundingSourcesStore = create<{
    fundingSources: IFundingSource[];
    setFundingSources: (fundingSources: IFundingSource[]) => void;
    saveFundingSource: (fundingSource: IFundingSource) => void;
    removeFundingSource: (id: number) => void;
}>((set) => ({
    fundingSources: [],
    setFundingSources: (fundingSources) => set({ fundingSources }),
    saveFundingSource: (fundingSource) =>
        set((state) => ({
            fundingSources: fundingSource.id
                ? state.fundingSources.map((source) =>
                      source.id === fundingSource.id ? fundingSource : source
                  )
                : [
                      ...state.fundingSources,
                      { ...fundingSource, id: Math.random() * 100000 },
                  ],
        })),
    removeFundingSource: (id: number) =>
        set((state) => ({
            fundingSources: state.fundingSources.filter(
                (source) => source.id !== id
            ),
        })),
}));

export const useFundingSources = () => {
    const {
        fundingSources,
        setFundingSources,
        saveFundingSource,
        removeFundingSource,
    } = useFundingSourcesStore();

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const storagePayload = JSON.parse(
            localStorage.getItem('fundingSources') || '[]'
        );
        const savedFundingSources = storagePayload.map(
            (source: IFundingSource) => ({
                ...source,
                take_effect_date: source.take_effect_date
                    ? dayjs(source.take_effect_date)
                    : undefined,
                recurrence_end: source.recurrence_end
                    ? dayjs(source.recurrence_end)
                    : undefined,
            })
        );
        console.log('savedFundingSources', savedFundingSources);
        setFundingSources(savedFundingSources || []);
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (!hasLoaded) return;
        let storagePayload = fundingSources.map((source) => ({
            ...source,
            take_effect_date: source.take_effect_date?.format('YYYY-MM-DD'),
            recurrence_end: source.recurrence_end?.format('YYYY-MM-DD'),
        }));
        localStorage.setItem('fundingSources', JSON.stringify(storagePayload));
        console.log('saveFundingSources', storagePayload);
    }, [fundingSources]);

    return {
        fundingSources,
        setFundingSources,
        saveFundingSource,
        deleteFundingSource: removeFundingSource,
    };
};
