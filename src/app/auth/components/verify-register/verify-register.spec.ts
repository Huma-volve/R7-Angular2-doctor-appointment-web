import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRegister } from './verify-register';

describe('VerifyRegister', () => {
  let component: VerifyRegister;
  let fixture: ComponentFixture<VerifyRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
