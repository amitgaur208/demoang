import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">User information</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <label class="col-sm-2 ">Username</label>
        <div class="col-sm-10">
          {{ name.firstName.value+" "+name.lastName.value }}
        </div>
      </div>  
      <div class="row">
        <label class="col-sm-2 ">Phone</label>
        <div class="col-sm-10">
          {{ name.phone.value }}
        </div>
      </div>
      <div class="row">
        <label class="col-sm-2 ">Email</label>
        <div class="col-sm-10">
          {{ name.email.value }}
        </div>
      </div> 
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="thankYou()"
      >
        OK
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal, private router: Router) {}
  
  thankYou(){
    this.activeModal.close('Close click')
    this.router.navigate(['/thank-you']);
  }

}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  closeResult: string;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {}

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      ext: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.open();
  }
}
