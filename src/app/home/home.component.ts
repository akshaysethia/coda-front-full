import { Component, OnInit } from '@angular/core';
import { Candidate } from '../shared/candidate';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  candidates: Candidate[] = null;
  errMsg: string = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllCandidates().subscribe(
      (data) => {
        if (data.candidates) {
          this.candidates = data.candidates;
        } else {
          this.candidates = [];
          this.errMsg = data.message;
        }
      },
      (err) => (this.errMsg = <any>err)
    );
  }
}
