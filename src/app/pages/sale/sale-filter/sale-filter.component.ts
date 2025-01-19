import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-sale-filter',
  templateUrl: './sale-filter.component.html',
  styleUrl: './sale-filter.component.css',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule, DemoNgZorroAntdModule],
  encapsulation: ViewEncapsulation.None
})
export class SaleFilterComponent implements OnInit {
  @Output() filtersData = new EventEmitter<any>();

  form!: FormGroup;
  isCollapsed = false;
  loading = 0;
  group_types = [{ label: '', value: 0 }];

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      group_type: [""],
      code: [""]
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed; // Alterna o estado de visibilidade
  }

  clearFilters() {
    this.form.reset();
    this.onSubmit();
  }

  onSubmit(): void {
    this.filtersData.emit(this.form.value);
  }
}
