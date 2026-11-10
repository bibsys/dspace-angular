import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ActivatedRouteStub } from '../../shared/testing/active-router.stub';
import { WhatIsOerComponent } from './what-is-oer.component';
import { WhatIsOerContentComponent } from './what-is-oer-content/what-is-oer-content.component';

describe('WhatIsOerComponent', () => {
  let component: WhatIsOerComponent;
  let fixture: ComponentFixture<WhatIsOerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), WhatIsOerComponent],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).overrideComponent(WhatIsOerComponent, { remove: { imports: [WhatIsOerContentComponent] } }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIsOerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
