import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandEditComponent } from './cand-edit.component';

describe('CandEditComponent', () => {
  let component: CandEditComponent;
  let fixture: ComponentFixture<CandEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
