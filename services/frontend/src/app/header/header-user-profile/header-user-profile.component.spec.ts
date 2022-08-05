import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserProfileComponent } from './header-user-profile.component';

describe('HeaderUserProfileComponent', () => {
  let component: HeaderUserProfileComponent;
  let fixture: ComponentFixture<HeaderUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
