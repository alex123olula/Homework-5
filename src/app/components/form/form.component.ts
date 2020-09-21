import { Component, Inject, OnInit } from '@angular/core';
import { AlbumsService } from '../../services/albums.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector   : 'app-form',
    templateUrl: './form.component.html',
    styleUrls  : ['./form.component.scss']
})
export class FormComponent implements OnInit {
    form: FormGroup;
    visible                               = true;
    selectable                            = true;
    removable                             = true;
    addOnBlur                             = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        public album: AlbumsService,
        private dialogRef: MatDialogRef<FormComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            name    : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            band    : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            genre   : this.fb.array([], [Validators.required]),
            label   : this.fb.array([], [Validators.required]),
            producer: this.fb.array([], [Validators.required])
        });
    }

    // get data
    get getName() {
        return this.form.get('name');
    }

    get getBand() {
        return this.form.get('band');
    }

    get getLabel(): FormArray {

        return this.form.get('label') as FormArray;
    }

    get getGenre(): FormArray {
        return this.form.get('genre') as FormArray;
    }

    get getProducer(): FormArray {
        return this.form.get('producer') as FormArray;
    }

    ngOnInit(): void {
        this.show();
    }

    // show values in input
    show() {
        this.form.patchValue(this.album.selected);
        this.album.selected.label.forEach(e => {
            this.getLabel.push(this.fb.control(e));
        });
        this.album.selected.genre.forEach(e => {
            this.getGenre.push(this.fb.control(e));
        });
        this.album.selected.producer.forEach(e => {
            this.getProducer.push(this.fb.control(e));
        });
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.form.valid) {
            this.form.reset();
        }
    }

    // add label or quit
    addLabel(event: MatChipInputEvent): void {
        const inputLabel = event.input;
        const valueLabel = event.value;

        // Add our requirement
        if ((valueLabel || '').trim()) {

            this.getLabel.push(this.fb.control(valueLabel.trim()));
        }

        // Reset the input value
        if (inputLabel) {
            inputLabel.value = '';
        }
    }

    // add genre or quit
    addGenre(event: MatChipInputEvent): void {
        const inputGenre = event.input;
        const valueGenre = event.value;

        // Add our requirement
        if ((valueGenre || '').trim()) {

            this.getGenre.push(this.fb.control(valueGenre.trim()));
        }

        // Reset the input value
        if (inputGenre) {
            inputGenre.value = '';
        }
    }

    addProducer(event: MatChipInputEvent): void {
        const inputProducer = event.input;
        const valueProducer = event.value;

        // Add our requirement
        if ((valueProducer || '').trim()) {

            this.getProducer.push(this.fb.control(valueProducer.trim()));
        }

        // Reset the input value
        if (inputProducer) {
            inputProducer.value = '';
        }
    }

    // remove by index
    removeLabel(index: number): void {
        this.getLabel.removeAt(index);
    }

    removeGenre(index: number): void {
        this.getGenre.removeAt(index);
    }

    removeProducer(index: number): void {
        this.getProducer.removeAt(index);
    }

    // check errors
    public hasError = (controlName: string, errorName: string) => {
        return this.form.controls[controlName].hasError(errorName);
    }

    // save form if album not in collection add if it is edit
    onSAveForm() {
        if (this.album.selected.id === null) {
            const newAlbum = {
                name    : this.getName.value,
                band    : this.getBand.value,
                label   : this.getLabel.value,
                genre   : this.getGenre.value,
                producer: this.getProducer.value
            };
            this.album.addAlbum(newAlbum);
        } else {
            const editedAlbum = {
                id      : this.album.selected.id,
                name    : this.getName.value,
                band    : this.getBand.value,
                label   : this.getLabel.value,
                genre   : this.getGenre.value,
                producer: this.getProducer.value
            };
            this.album.editAlbum(editedAlbum);
        }
        this.close();
    }

    close(): void {
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.dialogRef.close();
    }
}
