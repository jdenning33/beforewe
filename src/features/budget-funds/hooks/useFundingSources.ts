'use client';
import { create } from 'zustand';
import { IFundingSource } from '@/src/features/budget-funds/hooks/IFundingSource';

export const useFundingSources = create<{
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
