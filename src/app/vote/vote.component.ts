import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/users';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
})
export class VoteComponent implements OnInit {
  @ViewChild('votForm') voteFormDirective;
  voteForm: FormGroup;
  vote: User;
  errMsg: string = null;

  formErrors = {
    name: '',
    email: '',
  };

  validationMessages = {
    name: {
      required: 'name is Required !',
      minlength: 'name should be atleast 3 chars',
      maxlength: 'name was asked, not an essay !',
    },
    email: {
      required: 'email is required !',
      email: 'email not in correct format !',
    },
  };

  constructor(
    public modal: NgbActiveModal,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.voteForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });

    this.voteForm.valueChanges.subscribe((data) => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any) {
    if (!this.voteForm) {
      return;
    }
    const form = this.voteForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + '\n';
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    this.vote = this.voteForm.value;
    this.dataService.vote(this.vote).subscribe(
      (res) => {
        this.modal.close(res.success);
        this.dataService.filter(res.message);
      },
      (err) => (this.errMsg = <any>err)
    );

    this.voteForm.reset();
    this.voteFormDirective.resetForm();
  }
}
