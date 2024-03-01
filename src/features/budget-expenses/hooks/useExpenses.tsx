import {
    createSimpleZustandStore,
    useSimpleLocalStorage,
} from '../../../utils/useSimpleZustandStore';
import { IExpense } from './models';

const useExpensesStore = createSimpleZustandStore<IExpense>();
export const useExpenses = () => {
    let expensesStore = useExpensesStore();
    const localStore = useSimpleLocalStorage<IExpense>(
        expensesStore,
        'expenses'
    );

    return {
        expenses: localStore.items,
        setExpenses: localStore.setItems,
        saveExpense: localStore.saveItem,
        deleteExpense: localStore.deleteItem,
    };
};
