import { Component, OnInit } from '@angular/core';
import { SaleHeaderComponent } from '../sale-header/sale-header.component';
import { SaleFilterComponent } from '../sale-filter/sale-filter.component';
import { SaleTableComponent } from '../sale-table/sale-table.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css',
  standalone : true,
  imports : [SaleHeaderComponent, SaleFilterComponent,SaleTableComponent]
})
export class SaleComponent implements OnInit {
  
  currentFilters: any;
  currentPagination: any;
  
  constructor() { }

  ngOnInit(): void {

  }

  filterTableData(e: any) {
    this.currentFilters = Object.assign({}, e);
    this.currentPagination = {};
  }


}
