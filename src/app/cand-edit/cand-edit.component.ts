import { Component, OnInit } from '@angular/core';
import { Candidate } from '../shared/candidate';
import { ExpertIn } from '../shared/expertin';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cand-edit',
  templateUrl: './cand-edit.component.html',
  styleUrls: ['./cand-edit.component.css'],
})
export class CandEditComponent implements OnInit {
  candidate: Candidate = null;
  expertinArray: ExpertIn[];
  errMsg: string = null;
  loader: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.candidate = this.dataService.cand;
    this.expertinArray = this.candidate.expertin;
  }

  addExpert() {
    this.expertinArray.push({ lang: '', rating: null });
  }

  removeExpert(i: number) {
    this.expertinArray.splice(i, 1);
  }

  checkValue(): void {
    if (
      (this.candidate.expertiselvl < 1 || this.candidate.expertiselvl > 5) &&
      this.candidate.expertiselvl
    ) {
      this.candidate.expertiselvl = 3;
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.loader = true;
    this.candidate.expertin = this.expertinArray;
    this.dataService.updateCand(this.candidate).subscribe(
      (data) => {
        this.errMsg = data.message;
        setTimeout(() => {
          this.router.navigate(['/home']);
          this.loader = false;
          this.errMsg = null;
        }, 4000);
      },
      (err) => console.log(err)
    );
  }
}
