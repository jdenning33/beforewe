import { Dayjs } from 'dayjs';

type IUnsavedFundingSource = {
    name: string;
    amount: number;
    take_effect_date?: Dayjs;
    use_recurrence?: boolean;
    recurrence?: number;
    recurrence_unit?: 'day' | 'week' | 'month' | 'year';
    recurrence_end?: Dayjs | null;
};
export type IFundingSource = {
    id: number;
} & IUnsavedFundingSource;
