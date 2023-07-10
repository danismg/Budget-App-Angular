import { Component, OnInit } from '@angular/core';
import { BudgetItem } from 'src/shared/moduls/budget-item.modul';
import { UpdateEvent } from '../../shared/moduls/update-item.modul';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  budgetItems: BudgetItem[] = new Array<BudgetItem>();
  totalBudget: number = 0;

  constructor() {
    let localStorageValue = localStorage.getItem('budgetItems');
    if (localStorageValue) this.budgetItems = JSON.parse(localStorageValue);
  }

  ngOnInit(): void {
    localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
  }

  addItem(newItem: BudgetItem): void {
    this.budgetItems.push(newItem);
    localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
    this.totalBudget += newItem.amount ?? 0;
  }

  deleteItem(item: BudgetItem): void {
    let index = this.budgetItems.indexOf(item);
    this.budgetItems.splice(index, 1);
    localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
    this.totalBudget -= item.amount ?? 0;
  }

  updateItem(updateEvent: UpdateEvent) {
    // result is the update budget item
    // replace the item with the new updated/submitted item form the form
    this.budgetItems[this.budgetItems.indexOf(updateEvent.old)] =
      updateEvent.new;
    localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
    this.totalBudget -= updateEvent.old.amount ?? 0;
    this.totalBudget += updateEvent.new.amount ?? 0;
  }
}
