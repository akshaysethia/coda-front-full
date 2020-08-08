import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Candidate } from '../shared/candidate';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VoteComponent } from '../vote/vote.component';
import { AdminDelComponent } from '../admin-del/admin-del.component';
import { AdminEditComponent } from '../admin-edit/admin-edit.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  params: Params = null;
  candidate: Candidate = null;
  errMsg: string = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location,
    private modal: NgbModal
  ) {
    this.dataService.listen().subscribe((data) => {
      this.errMsg = data.message;
      this.params = this.route.params;
      this.dataService.getCandidate(this.params.value.id).subscribe(
        (data) => {
          this.candidate = data.candidate;
        },
        (err) => (this.errMsg = <any>err)
      );
      setTimeout(() => {
        this.errMsg = null;
      }, 5000);
    });
  }

  ngOnInit(): void {
    this.params = this.route.params;
    this.dataService.getCandidate(this.params.value.id).subscribe(
      (data) => {
        this.candidate = data.candidate;
        this.errMsg = data.message;
        setTimeout(() => {
          this.errMsg = null;
        }, 3000);
      },
      (err) => (this.errMsg = <any>err)
    );
  }

  voteModal(id: string): void {
    this.dataService.id = id;
    this.modal.open(VoteComponent, {
      centered: true,
      keyboard: true,
      scrollable: true,
    });
  }

  goBack(): void {
    this.location.back();
  }

  delete(id: string): void {
    this.dataService.id = id;
    this.modal.open(AdminDelComponent, { centered: true, keyboard: true });
  }

  edit(cand: Candidate): void {
    this.dataService.cand = cand;
    this.modal.open(AdminEditComponent, {
      centered: true,
      keyboard: true,
      scrollable: true,
    });
  }
}
