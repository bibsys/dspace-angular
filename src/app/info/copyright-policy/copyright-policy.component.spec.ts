import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ActivatedRouteStub } from '../../shared/testing/active-router.stub';
import { CopyrightPolicyComponent } from './copyright-policy.component';
import { CopyrightPolicyContentComponent } from './copyright-policy-content/copyright-policy-content.component';

describe('CopyrightPolicyComponent', () => {
  let component: CopyrightPolicyComponent;
  let fixture: ComponentFixture<CopyrightPolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), CopyrightPolicyComponent],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).overrideComponent(CopyrightPolicyComponent, { remove: { imports: [CopyrightPolicyContentComponent] } }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
