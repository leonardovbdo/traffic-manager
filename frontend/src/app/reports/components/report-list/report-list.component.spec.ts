import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListComponent } from './report-list.component';

describe('DashboardComponent', () => {
  let component: ReportListComponent;
  let fixture: ComponentFixture<ReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
