import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import NzColumn from '../../../models/column';
import { DemoNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { TokenStorageService } from '../../../services/token.storage.service';
import { DataResetService } from '../../../services/data.reset.service';
import { SaleService } from '../../../services/sale.service';
import { ModalService } from '../../../services/modal.service';
import SaleModel from '../../../models/interfaces/SaleModel';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrl: './sale-table.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule
  ]
})
export class SaleTableComponent implements OnInit {
  isGestor: boolean = false;
  @Input() filter: any;
  currentPage = 1;
  itemsPerPage = 10;
  loading = 0;
  items: any;
  totalData = 0;
  filters: any = {};

  dtResetObservable: any;

  listOfColumns: NzColumn[] = [
    {
      title: 'DESCRIÇÃO',
      field: 'description',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.index_type_description.localeCompare(b.index_type_description),
      sortDirections: ['ascend', 'descend', null],
      nzAlign: null

    },
    {
      title: 'AÇÕES',
      field: '',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      nzAlign: 'right'
    },
  ];

  constructor(private dataResetService: DataResetService,
    private saleService: SaleService,
    private modalService: ModalService,
    private message: NzMessageService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.dtResetObservable = this.dataResetService.resetData.subscribe((res) => {
      this.getData({
        skip: (this.currentPage * 10) - 10,
        take: this.itemsPerPage
      });
    });
  }

  ngOnDestroy(): void {
    this.dtResetObservable?.unsubscribe();
  }

  ngOnChanges() {
    if (this.filter) {
      this.filters = this.filter;

      this.filters.skip = 0;
      this.filters.take = 10;

      this.getData(this.filters);
    } else {
      this.getData({ skip: 0 });
    }
  }

  getData(data: any) {
    this.loading++;
    this.filters.skip = data.skip;
    this.filters.take = this.itemsPerPage;
    if (data.sortfield) {
      this.filters.sortfield = data.sortfield;
    }
    if (data.sortorder) {
      this.filters.sortorder = data.sortorder;
    }

    this.saleService.getList(this.filters).subscribe((res) => {
      if (res.success === true) {
        this.loading--;
        this.items = res.data;
        this.totalData = res.total_records ?? 0
      } else {
        this.loading--;
        this.items = [];
        this.totalData = 0;
      }
    }, (error: any) => {
      this.loading--;
      this.items = [];
      this.totalData = 0
    })
  }

  onSortChange(column: NzColumn): void {
    // Cycle through 'ascend', 'descend', and 'null'
    if (column.sortOrder === 'ascend') {
      column.sortOrder = 'descend';
    } else if (column.sortOrder === 'descend') {
      column.sortOrder = null;
    } else {
      column.sortOrder = 'ascend';
    }

    // Reset other columns' sortOrder
    this.listOfColumns.forEach((col) => {
      if (col.field !== column.field) {
        col.sortOrder = null;
      }
    });

    // Update filters and get data
    this.filters.sort_order = column.sortOrder === 'ascend' ? 'asc' : column.sortOrder === 'descend' ? 'desc' : null;
    this.filters.sort_field = this.filters.sort_order ? column.field : null;
    this.currentPage = 1; // Reset to the first page when sorting
    this.getData(this.filters);
  }

  onPageChange(page: number): void {
    if (this.loading === 0) {
      this.currentPage = page;
      this.filters.skip = (this.currentPage - 1) * this.itemsPerPage;
      this.getData(this.filters);
    }
  }

  onPageSizeChange(size: number): void {
    if (this.loading === 0) {
      this.itemsPerPage = size;
      this.currentPage = 1;
      this.filters.take = this.itemsPerPage;
      this.filters.skip = 0;
      this.getData(this.filters);
    }
  }

  delete(item: SaleModel) {
    this.loading++;
    this.modalService.deletar().subscribe(result => {
      if (this.isGestor === false) {
        if (result === 'ok') {
          this.saleService.delete({ id: item.id }).subscribe((response) => {
            if (response.success) {
              this.loading--;
              this.message.create('success', `O item foi excluido com sucesso!`);
              this.dataResetService.resetData.emit();
            }
          }, (error) => {
            this.loading--;
            this.message.create('error', `Erro ao excluir`);
            console.error('error:', error);
          });
        }
      } else {
        this.loading--;
        this.message.create('error', `Seu nível de acesso não permite essa operação.`);
      }
    });
  }


  onResize({ width }: NzResizeEvent, col: string): void {
    this.listOfColumns = this.listOfColumns.map(e => (e.title === col ? { ...e, width: `${width}px` } : e));
  }
}
