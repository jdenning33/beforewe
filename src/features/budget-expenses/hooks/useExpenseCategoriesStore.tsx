import {
    createSimpleZustandStore,
    useSimpleLocalStorage,
} from '../../../utils/useSimpleZustandStore';
import { IExpenseCategory } from './models';

const useExpenseCategoriesStore = createSimpleZustandStore<IExpenseCategory>();
export const useExpenseCategories = () => {
    let expenseCategoriesStore = useExpenseCategoriesStore();
    const localStore = useSimpleLocalStorage<IExpenseCategory>(
        expenseCategoriesStore,
        'expense-categories'
    );

    return {
        expenseCategories: localStore.items,
        setExpenseCategories: localStore.setItems,
        saveExpenseCategory: localStore.saveItem,
        removeExpenseCategory: localStore.deleteItem,
    };
};
