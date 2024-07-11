import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  loaderDisplayValue = 'none'
  buttonDisplayValue = 'inline-block'
  isLoading: boolean = false;

  constructor(private toastr : ToastrService){}
  @ViewChild('messageForm') mssgForm : NgForm

  onMessage(){
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.mssgForm.reset()
      this.toastr.success("Message Sent")
    }, 1500);
  }
}
