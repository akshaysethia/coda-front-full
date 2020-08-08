import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-del',
  templateUrl: './admin-del.component.html',
  styleUrls: ['./admin-del.component.css'],
})
export class AdminDelComponent implements OnInit {
  adminCode: string = null;
  loader: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.loader = true;
    this.dataService.deleteCand(this.adminCode).subscribe((data) => {
      this.loader = false;
      alert(data.message);
      this.modal.close(data.success);
      this.router.navigate(['/home']);
    });
  }
}
