import { NotificationIcon } from '../../features/notifications/NotificationIcon';

export function Notifications() {
  return (
    <button className='btn btn-ghost btn-circle'>
      <div className='indicator'>
        <NotificationIcon />
        <span className='badge badge-xs badge-primary indicator-item'></span>
      </div>
    </button>
  );
}
