import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillCandidateDataComponent } from './fill-candidate-data.component';

describe('FillCandidateDataComponent', () => {
  let component: FillCandidateDataComponent;
  let fixture: ComponentFixture<FillCandidateDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillCandidateDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillCandidateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
