import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonFirestoreService } from '../../services/pokemon-firestore.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';

@Component({
    selector   : 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls  : ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
    // Showing columns
    displayedColumns: string[] = ['name', 'image', 'abilities', 'weight', 'height', 'actions'];
    dataSource                 = new MatTableDataSource();
    // data: any[] = [];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private pokemonService: PokemonService, private router: Router,
                private pokemonFirestoreService: PokemonFirestoreService,
                public pokemon: PokemonFirestoreService,
                private dialog: MatDialog) { }

    ngOnInit(): void {
        this.getData();
        this.dataSource.paginator = this.paginator;
        // !!!!!!!!   1 time used to get pokemons and push it to firebase
        // this.getPokemons()

    }

    // !!!!!!!!   1 time used to get pokemons and push it to firebase
    // getPokemons() {
    //     for (let i = 1; i <= 50; i++) {
    //         this.pokemonService.getPokemons(i).subscribe(
    //             res => {
    //                 this.pokemon.addPokemon({
    //                     image    : res.sprites.front_default,
    //                     name     : res.name,
    //                     abilities: res.abilities.map(a => a.ability.name),
    //                     weight   : res.weight,
    //                     height   : res.height
    //                 });
    //             },
    //             err => {
    //                 console.log(err);
    //             }
    //         );
    //     }
    // }
    // Get data from firestore
    getData() {
        this.pokemonFirestoreService.getAllPokemons()
            .subscribe(res => {
                this.dataSource.data = res;
            });
    }

    // Open modal and delete all data to get clear inputs
    newPokemon() {
        this.openModal();
        this.resetPokemonForm();
        this.getData();

    }

    // Opening modal and put there selected pokemon
    onEdit(element) {
        this.openModal();
        if (element) {
            this.pokemonFirestoreService.selectedPokemon = element;

        }

    }

    // Deleting pokemon by id
    onDelete(id: string) {
        return this.pokemonFirestoreService.deletePokemon(id);
    }

    // Open modal
    openModal(): void {
        const dialogConfig     = new MatDialogConfig();
        dialogConfig.data      = {
            title: 'Modal'
        };
        dialogConfig.autoFocus = true;
        this.dialog.open(PokemonFormComponent, dialogConfig);
    }

    // Reset form
    resetPokemonForm(): void {
        this.pokemonFirestoreService.selectedPokemon.name      = '';
        this.pokemonFirestoreService.selectedPokemon.height    = '';
        this.pokemonFirestoreService.selectedPokemon.image     = '';
        this.pokemonFirestoreService.selectedPokemon.abilities = [];
        this.pokemonFirestoreService.selectedPokemon.id        = null;
    }

    // Filter for pagination
    applyFilter(event: Event) {
        const filterValue      = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
