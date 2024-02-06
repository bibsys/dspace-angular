import { Component, OnInit } from '@angular/core';
import { SubmissionSectionUploadFileComponent as BaseComponent } from 'src/app/submission/sections/upload/file/section-upload-file.component';


@Component({
    selector: 'ds-submission-upload-section-file',
    templateUrl: './section-upload-file.component.html',
    styleUrls: ['./section-upload-file.component.scss']
})
export class SubmissionSectionUploadFileComponent extends BaseComponent implements OnInit {}
