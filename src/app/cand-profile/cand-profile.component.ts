import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../shared/candidate';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-cand-profile',
  templateUrl: './cand-profile.component.html',
  styleUrls: ['./cand-profile.component.css'],
})
export class CandProfileComponent implements OnInit {
  params: Params;
  candidate: Candidate;
  errMsg: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.params = this.route.params;
    this.dataService.getCandidate(this.params.value.id).subscribe(
      (data) => {
        this.candidate = data.candidate;
        this.dataService.cand = data.candidate;
        this.errMsg = data.message;
        setTimeout(() => {
          this.errMsg = null;
        }, 3000);
      },
      (err) => (this.errMsg = <any>err)
    );
  }

  edit(cand: Candidate) {
    this.dataService.cand = cand;
    this.router.navigate(['/editCandidate']);
  }
}
