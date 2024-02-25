import { Moment } from 'moment';

export interface IUnsavedEvent {
    id?: number /* primary key */;
    created_at?: Moment;
    access_id?: string;
    alias?: string;
    moniker?: string;
    fiance_1_name: string | null;
    fiance_2_name: string | null;
    primary_date: Moment | null;
    target_budget: number | null;
    event_size: number | null;
    name: string;
    image_url?: string;
    is_public: boolean;
}

export interface IEvent extends IUnsavedEvent {
    id: number /* primary key */;
    created_at: Moment;
    access_id: string;
}
