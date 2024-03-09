import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../../../services/api.service';
import { LocationService } from '../../../../services/location.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

    public success = false;
    public submitting = false;
    public error?: string;
    public errorFields?: string[];
    public contactForm!: FormGroup;

    private _destroy$ = new Subject<void>();

    constructor(
        private _changeDetector: ChangeDetectorRef,
        private _apiService: ApiService,
        private _locationService: LocationService
    ) { }

    public ngOnInit(): void {
        this.contactForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            telephone: new FormControl(null, []),
            message: new FormControl(null, [Validators.required]),
            captcha: new FormControl(null, [Validators.required])
        });
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public hasError(field: string): boolean {
        return (field && this.errorFields) ? this.errorFields.indexOf(field) >= 0 : false;
    }

    public onSubmit(event: Event): void {
        if (event) {
            event.preventDefault();
        }
        if (!this.submitting && this.contactForm.valid) {
            this.success = false;
            this.submitting = true;
            this.error = undefined;
            this.errorFields = undefined;
            const inputData = this.contactForm.getRawValue();
            this._apiService.get<{ success: boolean }>('contact', 'sendemail', {
                name: inputData.name,
                email: inputData.email,
                message: inputData.message,
                fields: { telephone: inputData.telephone },
                captcha: inputData.captcha
            }).pipe(
                takeUntil(this._destroy$),
                finalize(() => { this.submitting = false; this._changeDetector.markForCheck(); })
            ).subscribe({
                next: (result) => {
                    if (result && result.success) {
                        this.success = true;
                    } else {
                        this.error = 'An unknown error occured. Try again later.';
                    }
                },
                error: (error: HttpErrorResponse) => {
                    this.error = error.error.displayerror;
                    this.errorFields = error.error.fields;
                }
            });
        }
    }

    public getCaptchaUrl(): string {
        const host = this._locationService.hostname;
        return `https://${host}/system/captcha.php`;
    }

}
