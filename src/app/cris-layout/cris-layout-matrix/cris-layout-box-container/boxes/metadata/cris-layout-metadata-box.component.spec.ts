import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisLayoutMetadataBoxComponent } from './cris-layout-metadata-box.component';
import { Observable, of } from 'rxjs';
import { RemoteData } from '../../../../../core/data/remote-data';
import { createSuccessfulRemoteDataObject } from '../../../../../shared/remote-data.utils';
import { Item } from '../../../../../core/shared/item.model';
import { Bitstream } from '../../../../../core/shared/bitstream.model';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLoaderMock } from '../../../../../shared/mocks/translate-loader.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrisLayoutLoaderDirective } from '../../../../directives/cris-layout-loader.directive';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BitstreamDataService } from '../../../../../core/data/bitstream-data.service';
import { boxMetadata } from '../../../../../shared/testing/box.mock';
import { TextComponent } from './components/text/text.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { RowComponent } from './row/row.component';

// const testType = 'Publication';

class TestItem {
  // firstMetadataValue(key: string): string {
  // return testType;
  // }
}

// tslint:disable-next-line: max-classes-per-file
class BitstreamDataServiceMock {
  getThumbnailFor(item: Item): Observable<RemoteData<Bitstream>> {
    return of(
      createSuccessfulRemoteDataObject(null)
    );
  }
}

describe('CrisLayoutMetadataBoxComponent', () => {
  let component: CrisLayoutMetadataBoxComponent;
  let fixture: ComponentFixture<CrisLayoutMetadataBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateLoaderMock
        }
      }),
        BrowserAnimationsModule,
        SharedModule],
      providers: [
        { provide: BitstreamDataService, useClass: BitstreamDataServiceMock },
        { provide: 'boxProvider', useClass: boxMetadata },
        { provide: 'itemProvider', useClass: new TestItem() as Item },
      ],
      declarations: [
        CrisLayoutMetadataBoxComponent,
        CrisLayoutLoaderDirective,
        RowComponent,
        TextComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(CrisLayoutMetadataBoxComponent, {
      set: {
        entryComponents: [TextComponent]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisLayoutMetadataBoxComponent);
    component = fixture.componentInstance;
    component.item = new TestItem() as Item;
    component.box = boxMetadata;
    fixture.detectChanges();
  });

  xit('check rows rendering', (done) => {
    const rowsFound = fixture.debugElement.queryAll(By.css('div[ds-row]'));

    expect(rowsFound.length).toEqual(2);
    done();
  });
});
