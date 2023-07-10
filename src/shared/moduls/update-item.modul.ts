import { BudgetItem } from './budget-item.modul';

export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}
