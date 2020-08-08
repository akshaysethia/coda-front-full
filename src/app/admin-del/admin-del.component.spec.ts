import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDelComponent } from './admin-del.component';

describe('AdminDelComponent', () => {
  let component: AdminDelComponent;
  let fixture: ComponentFixture<AdminDelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
