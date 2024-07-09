import { TestBed } from '@angular/core/testing';

import { TypeReportService } from './type-report.service';

describe('TypeReportService', () => {
  let service: TypeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
