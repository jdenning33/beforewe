import { Moment } from 'moment';

export type IProfile = {
    id: string | undefined /* primary key */;
    role: string;
    updated_at: Moment | null;
    username: string | null;
    about_me: string | null;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
};

export type BudgetExpectedCostType = 'target' | 'costs' | 'payments';
export interface ITile {
    id?: number /* primary key */;
    event_id: number;
    created_at?: Moment;
    name: string;
    order: number;
    vendor_name?: string;
    target_cost: number;
    actual_cost: number | null;
    actual_paid: number | null;
    has_budget: boolean;
    has_timeline: boolean;
    has_vendors: boolean;
    has_tasks: boolean;
    color?: string;
    icon?: string;
    category: string;
    category_id?: number;
    image_url?: string;
}

export interface ISuggestedCategory {
    id: number /* primary key */;
    created_at: Moment;
    name: string;
    wizard_title: string;
    wizard_subtitle: string;
    order: number;
    tiles?: ISuggestedTile[];
}
export type ISuggestedTile = {
    id: number /* primary key */;
    created_at: Moment;
    name: string;
    order: number;
    use_default: boolean;
    show_default: boolean;
    has_budget: boolean;
    has_timeline: boolean;
    has_vendors: boolean;
    has_tasks: boolean;
    budget_percent: number | null;
    icon: string;
    category_id: number;
    suggested_category?: ISuggestedCategory;
};

export interface ICategory {
    id: number /* primary key */;
    event_id: number;
    created_at: Moment;
    name: string;
    order: number;
}

export type ITimeBlock = {
    id?: number /* primary key */;
    created_at?: Moment;
    event_id: number /* primary key */;
    tile_id?: number;
    timeline_id?: number;
    schedule_id?: number;
    start_minute: number;
    end_minute: number;
    title: string;
    body?: string;
    start: Moment;
    end: Moment;
    all_day: boolean;
};

export type IPotentialVendor = {
    id: number /* primary key */;
    tile_id: number;
    event_id: number;
    created_at: Moment;
    name: string;
    description?: string;
};

export type ITaskStatus = 'new' | 'next' | 'done';
export type ITask = {
    id?: number /* primary key */;
    tile_id: number;
    event_id: number;
    task_suggestion_id?: number;
    created_at?: Moment;
    description: string;
    order: number;
    start_date: Moment | null;
    due_date: Moment | null;
    status: ITaskStatus;
};

export type IPayment = {
    id?: number /* primary key */;
    tile_id: number;
    event_id: number;
    created_at?: Moment;
    description: string;
    order: number;
    target_date: Moment | null;
    target_type: 'paid' | 'due';
    amount: number;
    is_paid: boolean;
};

export type ICost = {
    id?: number /* primary key */;
    tile_id: number;
    event_id: number;
    created_at?: Moment;
    description: string;
    order: number;
    units: number;
    unit_cost: number;
};

export type IAspect = {
    id: number /* primary key */;
    created_at: Moment;
    name: string;
    category: string;
    use_default: boolean;
    icon: string;
};

export type ICollaborationInvite = {
    id: number /* primary key */;
    created_at: Moment;
    user_id?: number;
    event_id: number;
    event_name: string;
    email: string;
    role: string;
    invited_by_name: string | null;
    is_accepted?: boolean;
};

export type ICollaborator = {
    id: number;
    name: string;
    email: string;
    role: string;
    user_id: number;
    event_id: number;
    created_at: Moment;
};
export type ISuggestedTask = {
    id: number;
    event_id: number;
    created_at: Moment;
    description: string;
    aspect_name: string;
    start_week: number | null;
    due_week: number | null;
    tile_id: number;
    is_accepted: boolean | null;
    include_by_default: boolean;
};
export type IRawSuggestedTask = {
    id: number;
    created_at: Moment;
    description: string;
    aspect_name: string;
    start_week: number | null;
    due_week: number | null;
    include_by_default: boolean;
};

export type ITimeline = {
    id?: number;
    created_at?: Moment;
    event_id: number;
    name: string;
    start_date: Moment;
    start_minute: number;
    end_minute: number;
};

export type ISchedule = {
    id?: number;
    created_at?: Moment;
    event_id: number;
    timeline_id?: number;
    tile_id?: number;
    name: string;
    order: number;
};
