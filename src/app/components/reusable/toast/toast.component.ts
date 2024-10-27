import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'kickathon-toast',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {
  @Input({ required: true })
  state!: 'error' | 'success' | 'info';

  @Input({ required: true })
  message!: string;

  isHidden: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.isHidden = true;
    }, 2000);
  }
}
