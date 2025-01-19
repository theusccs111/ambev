import { Component } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DemoNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

import { DataResetService } from '../../../services/data.reset.service';
import { SaleService } from '../../../services/sale.service';
import { FormattingService } from '../../../services/formatting.service';


@Component({
    selector: 'app-sale-modal',
    templateUrl: './sale-modal.component.html',
    styleUrls: ['./sale-modal.component.css'],
    standalone: true,

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DemoNgZorroAntdModule
    ]
})
export class SaleModalComponent
{
    form!: FormGroup ;
    formChanged: boolean = false;
    loading = 0;
    showError: boolean = false;
    errorMsg: any;

    formatter = (value: number | null) => this.formattingService.formatter(value);
    parser = (value: string) => this.formattingService.parser(value);


    constructor(
        private fb: NonNullableFormBuilder,
        private modalService: ModalService,
        private drawer: NzDrawerRef,
        private message: NzMessageService,
        private saleService: SaleService,
        private dataResetService: DataResetService,
        private formattingService: FormattingService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            saleNumber: [null, Validators.required],
            saleDate: [null, Validators.required],
            customerName: [null, Validators.required],
            totalSaleAmount: [null, Validators.required],
            branch: [null, Validators.required]
        });
        this.form.valueChanges.subscribe(() => {
            this.formChanged = true;
        });
    }


    onSubmit() {
        let data = this.form.value;
        
        if(this.form.valid){
            this.loading++;
            this.saleService.create(data).subscribe((res: any) => {
                if (res.success == true) {
                    this.loading--;
                    this.message.create('success', `O item foi cadastrado com sucesso!`);
                    this.drawer.close();
                    this.dataResetService.resetData.emit(true);
                } else {
                    this.loading--;
                    this.showError = true;
                    this.errorMsg = res.message_detail;
                }
            }, (error: any) => {
                this.loading--;
                this.showError = true;
                this.errorMsg = error.error.message_detail;
            })
        } else {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }


    }



    handleCancel(): void {
        if (!this.formChanged) {
            this.drawer.close();
            return;
        }

        this.modalService.cancelar().subscribe(result => {
            if (result === 'ok') {
                this.drawer.close();
            }
        });
    }
}
