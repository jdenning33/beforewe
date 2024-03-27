import { useEffect, useState } from 'react';
import { DrawerItem, useEditDrawerState } from './useEditDrawerState';
import { set } from 'react-hook-form';

export function EditDrawer() {
    const drawer = useEditDrawerState();
    const open = drawer.queue.length > 0;
    const [activeItem, setActiveItem] = useState<DrawerItem | undefined>(
        drawer.queue[0]
    );
    useEffect(() => {
        setActiveItem(drawer.queue[0]);
    }, [drawer.queue]);

    return (
        <div className='h-full'>
            {open && (
                <div
                    className={` fixed top-12 bottom-0 right-0 left-0 bg-gray-700 flex-1 cpointer-events-none z-[100] opacity-20 `}
                    onClick={(_) => drawer.pop()}
                ></div>
            )}
            <div
                className={`p-2 fixed bottom-0 shadow border-l-2 border-t-2 flex flex-col border-gray-300 right-0 w-96 xh-full top-12 min-h-[30rem] xmax-h-[40rem] bg-base-300 transition-all z-[101] ${
                    open ? '' : 'translate-x-full'
                }`}
            >
                <button
                    className='absolute top-0 right-0 p-2'
                    onClick={(_) => drawer.pop()}
                >
                    {drawer.queue.length > 1 && `<-`}
                </button>
                {activeItem && (
                    <div className='flex flex-col flex-1'>
                        <div className='h-full flex flex-col'>
                            <div className='text-lg font-medium px-2'>
                                {activeItem.title}
                            </div>
                            <div className='p-2 overflow-auto'>
                                {activeItem.content}
                            </div>
                        </div>
                    </div>
                )}
                <div className='flex gap-1 overflow-x-auto'>
                    {drawer.queue.map((item, index) => (
                        <button
                            className='bg-white p-1 rounded whitespace-nowrap hover:bg-base-200 cursor-pointer'
                            key={index}
                            onClick={(_) => setActiveItem(item)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
