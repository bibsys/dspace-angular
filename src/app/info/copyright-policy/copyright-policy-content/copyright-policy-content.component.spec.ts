import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ActivatedRouteStub } from '../../../shared/testing/active-router.stub';
import { CopyrightPolicyContentComponent } from './copyright-policy-content.component';

describe('CopyrightPolicyContentComponent', () => {
  let component: CopyrightPolicyContentComponent;
  let fixture: ComponentFixture<CopyrightPolicyContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), CopyrightPolicyContentComponent],
      providers: [{ provide: ActivatedRoute, useValue: new ActivatedRouteStub() }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightPolicyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
