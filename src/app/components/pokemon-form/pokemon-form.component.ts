import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { PokemonFirestoreService } from '../../services/pokemon-firestore.service';

@Component({
    selector   : 'app-pokemon-form',
    templateUrl: './pokemon-form.component.html',
    styleUrls  : ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {

    pokemonForm: FormGroup;
    visible                               = true;
    selectable                            = true;
    removable                             = true;
    addOnBlur                             = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        public pokemon: PokemonFirestoreService,
        private dialogRef: MatDialogRef<PokemonFormComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private fbp: FormBuilder
    ) {
        this.pokemonForm = this.fbp.group({
            name     : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
            image    : ['', [Validators.required, Validators.pattern(
                '^https?://(?:[a-z0-9\\-]+\\.)+[a-z]{2,6}(?:/[^/#?]+)+\\.(?:jpg|gif|png)$')]],
            height   : ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            weight   : ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
            abilities: this.fbp.array([], [Validators.required])

        });
    }

    // Get data
    get getName() {
        return this.pokemonForm.get('name');
    }

    get getImage() {
        return this.pokemonForm.get('image');
    }

    get getWeight() {
        return this.pokemonForm.get('weight');
    }

    get getIHeight() {
        return this.pokemonForm.get('height');
    }

    get getAbilities(): FormArray {
        return this.pokemonForm.get('abilities') as FormArray;
    }

    ngOnInit(): void {
        this.show();
    }

    // show data in inputs
    show() {
        this.pokemonForm.patchValue(this.pokemon.selectedPokemon);
        this.pokemon.selectedPokemon.abilities.forEach(e => {
            this.getAbilities.push(this.fbp.control(e));
        });

    }

    onSubmitPokemon(event: Event) {
        event.preventDefault();
        if (this.pokemonForm.valid) {
            this.pokemonForm.reset();
        }
    }

    // check errors
    public hasError = (controlName: string, errorName: string) => {
        return this.pokemonForm.controls[controlName].hasError(errorName);
    };

    // add ability or clear
    addAbility(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {

            this.getAbilities.push(this.fbp.control(value.trim()));
        }

        if (input) {
            input.value = '';
        }
    }

    // remove ability at index
    removeAbility(index: number): void {

        if (index >= 0) {
            this.getAbilities.removeAt(index);

        }
    }

    // set values
    onSAveForm() {
        if (this.pokemon.selectedPokemon.id == null) {
            const newPokemon = {
                name     : this.getName.value,
                image    : this.getImage.value,
                height   : this.getIHeight.value,
                abilities: this.getAbilities.value,
                weight   : this.getWeight.value
            };
            this.pokemon.addPokemon(newPokemon);
        } else {
            const editedPokemon = {
                id       : this.pokemon.selectedPokemon.id,
                name     : this.getName.value,
                image    : this.getImage.value,
                abilities: this.getAbilities.value,
                height   : this.getIHeight.value,
                weight   : this.getWeight.value
            };
            this.pokemon.editPokemon(editedPokemon);

        }
        this.close();
    }

    close(): void {
        this.pokemonForm.markAsPristine();
        this.pokemonForm.markAsUntouched();
        this.dialogRef.close();
    }

}
