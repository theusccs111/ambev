import { Component, OnInit } from '@angular/core';
import { SaleModalComponent } from '../sale-modal/sale-modal.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sale-header',
  templateUrl: './sale-header.component.html',
  styleUrl: './sale-header.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class SaleHeaderComponent implements OnInit {

  constructor(private nzDrawerService: NzDrawerService) { }

  ngOnInit(): void {

  }

  novo() {
    const modal = this.nzDrawerService.create({
      nzTitle: 'Cadastrar Venda',
      nzWidth: 1000,
      nzContent: SaleModalComponent,
      nzMaskClosable: false
    });
  }

}
