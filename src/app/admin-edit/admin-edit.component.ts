import { Component, OnInit } from '@angular/core';
import { Candidate } from '../shared/candidate';
import { ExpertIn } from '../shared/expertIn';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit {
  candidate: Candidate;
  expertinArray: ExpertIn[];
  loader: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.candidate = this.dataService.cand;
    this.expertinArray = this.candidate.expertin;
  }

  addExpert() {
    this.expertinArray.push({ lang: '', rating: null });
  }

  checkValue(): void {
    if (
      (this.candidate.expertiselvl < 1 || this.candidate.expertiselvl > 5) &&
      this.candidate.expertiselvl
    ) {
      this.candidate.expertiselvl = 3;
    }
  }

  removeExpert(i: number) {
    this.expertinArray.splice(i, 1);
  }

  onSubmit() {
    this.loader = true;
    this.candidate.expertin = this.expertinArray;
    this.dataService.adminUpdateCand(this.candidate).subscribe((data) => {
      this.loader = false;
      this.modal.close(data.success);
      alert(data.message);
      this.router.navigate(['/home']);
    });
  }
}
