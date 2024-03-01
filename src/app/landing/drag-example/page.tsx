'use client';
import React from 'react';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
    CARD: 'card',
};

export default function DragExample() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <DragCard text='Drag me' />
                <DragCard text='Drag me' />

                <Dustbin />
            </div>
        </DndProvider>
    );
}

/**
 * Your Component
 */
export function DragCard({ text }: { text: string }) {
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: { text },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.5 : 1,
            }),
        }),
        []
    );
    return (
        <div ref={dragRef} style={{ opacity }}>
            {text}
        </div>
    );
}

import type { CSSProperties, FC, ReactNode } from 'react';
import { useState } from 'react';
import { useDrop } from 'react-dnd';

function getStyle(backgroundColor: string): CSSProperties {
    return {
        border: '1px solid rgba(0,0,0,0.2)',
        minHeight: '8rem',
        minWidth: '8rem',
        color: 'white',
        backgroundColor,
        padding: '2rem',
        paddingTop: '1rem',
        margin: '1rem',
        textAlign: 'center',
        float: 'left',
        fontSize: '1rem',
    };
}

export interface DustbinProps {
    greedy?: boolean;
    children?: ReactNode;
}

export interface DustbinState {
    hasDropped: boolean;
    hasDroppedOnChild: boolean;
}

export const Dustbin: FC<DustbinProps> = ({ greedy, children }) => {
    const [hasDropped, setHasDropped] = useState(false);
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

    const [{ isOver, isOverCurrent }, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            drop(_item: unknown, monitor) {
                const didDrop = monitor.didDrop();
                if (didDrop && !greedy) {
                    return;
                }
                setHasDropped(true);
                setHasDroppedOnChild(didDrop);
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true }),
            }),
        }),
        [greedy, setHasDropped, setHasDroppedOnChild]
    );

    const text = greedy ? 'greedy' : 'not greedy';
    let backgroundColor = 'rgba(0, 0, 0, .5)';

    if (isOverCurrent || (isOver && greedy)) {
        backgroundColor = 'darkgreen';
    }

    return (
        <div ref={drop} style={getStyle(backgroundColor)}>
            {text}
            <br />
            {hasDropped && (
                <span>dropped {hasDroppedOnChild && ' on child'}</span>
            )}

            <div>{children}</div>
        </div>
    );
};
