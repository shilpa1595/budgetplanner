import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsettingComponent } from './budgetsetting.component';

describe('BudgetsettingComponent', () => {
  let component: BudgetsettingComponent;
  let fixture: ComponentFixture<BudgetsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetsettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
