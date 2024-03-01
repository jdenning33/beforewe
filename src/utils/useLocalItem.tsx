import { useEffect, useState } from 'react';

export function useLocalItem<T>(item: T) {
    const [localItem, setLocalItem] = useState<T>(item);

    useEffect(() => setLocalItem(item), [item]);

    function handleTextFieldChange(fieldName: keyof T) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalItem({
                ...localItem,
                [fieldName]: e.target.value,
            });
        };
    }

    function handleNumericFieldChange(fieldName: keyof T) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalItem({
                ...localItem,
                [fieldName]: +e.target.value,
            });
        };
    }

    return {
        localItem,
        handleNumericFieldChange,
        handleTextFieldChange,
        setLocalItem,
    };
}
