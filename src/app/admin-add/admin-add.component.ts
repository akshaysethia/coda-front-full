import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Candidate } from '../shared/candidate';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
})
export class AdminAddComponent implements OnInit {
  @ViewChild('addCandidate') addCandidateDirective;
  addCand: FormGroup;
  errMsg: string = null;
  cand: Candidate = null;
  loader: boolean = false;

  formErrors = {
    admin: '',
    name: '',
    email: '',
    password: '',
  };

  validationMessages = {
    admin: {
      required: 'name is Required !',
    },
    name: {
      required: 'name is Required !',
      minlength: 'name should be atleast 3 chars',
      maxlength: 'name was asked, not an essay !',
    },
    email: {
      required: 'email is required !',
      email: 'email not in correct format !',
    },
    password: {
      required: 'password is required !',
      minlength: 'password cannot be smaller than 8 chars !',
      maxlength: 'password cannot be greater than 10 chars !',
    },
  };

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.addCand = this.fb.group({
      admin: ['', [Validators.required]],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(8),
        ],
      ],
    });

    this.addCand.valueChanges.subscribe((data) => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any) {
    if (!this.addCand) {
      return;
    }
    const form = this.addCand;
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
    this.loader = true;
    this.cand = this.addCand.value;
    this.dataService.addCandidate(this.cand).subscribe((data) => {
      if (data.success) {
        this.errMsg = data.message;
      } else {
        this.errMsg = data.message;
      }
      this.loader = false;
      setTimeout(() => {
        this.errMsg = null;
      }, 4000);
    });
    this.addCand.reset();
    this.addCandidateDirective.resetForm();
  }
}
