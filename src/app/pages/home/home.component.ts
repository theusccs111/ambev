import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class HomeComponent implements OnInit {
  

  ngOnInit(): void {
    // this.dataObservable.subscribe(response => {
    //   this.data = response;
    // })
  }
}
