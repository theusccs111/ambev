import { Component, OnInit } from '@angular/core';
import ActionButton, { ToolbarService } from '../../services/toolbar.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from '../../ng-zorro-antd.module';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'], 
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoNgZorroAntdModule
  ]
})
export class ToolBarComponent implements OnInit {
  show: boolean = false;
  actionButtons: ActionButton[] | undefined;

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit() {
    this.toolbarService.onChangeIsVisible.subscribe(value => this.show = value);
    this.toolbarService.onChangeActionButtons.subscribe(actionButtons => this.actionButtons = actionButtons);
  }

  ngOnDestroy() {
    this.toolbarService.onChangeIsVisible.unsubscribe();
    this.toolbarService.onChangeActionButtons.unsubscribe();
  }
}
