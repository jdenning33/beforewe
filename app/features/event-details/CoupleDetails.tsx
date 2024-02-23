import { PersonIcon } from '../../components/icons/PersonIcon';
import { useEvent } from './hooks/useEvent';
import { useEvents } from './hooks/useEvents';

export function CoupleDetails() {
    const { event } = useEvent();

    return (
        <div className='flex'>
            <div className='flex flex-col items-center'>
                <PersonIcon className='h-32' />
                {event.fiance_1_name}
            </div>
            <div className='flex flex-col items-center'>
                <PersonIcon className='h-32' />
                {event.fiance_2_name}
            </div>
        </div>
    );
}
