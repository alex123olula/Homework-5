import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { PokemonI } from '../models/pokemon.interface';

export interface PokemonId extends PokemonI {
    id: string;
}

@Injectable({
    providedIn: 'root'
})
export class PokemonFirestoreService {
    pokemons: Observable<PokemonId[]>;
    public selectedPokemon = {
        id       : null,
        height   : null,
        weight   : '',
        image    : '',
        name     : '',
        abilities: []
    };
    private pokemonCollection: AngularFirestoreCollection<PokemonI>;

    // get pokemons from firestore
    constructor(private readonly afsPokemon: AngularFirestore) {
        this.pokemonCollection = afsPokemon.collection<PokemonI>('pokemons');
        this.pokemons          = this.pokemonCollection.snapshotChanges().pipe(
            map(action => action.map(a => {
                const data = a.payload.doc.data() as PokemonI;
                const id   = a.payload.doc.id;
                return {id, ...data};

            }))
        );
    }

    getAllPokemons() {
        return this.pokemons;
    }

    // edit pokemon by id and update it in firebase
    editPokemon(pokemon: PokemonId) {
        return this.pokemonCollection.doc(pokemon.id).update(pokemon);
    }

    // delete pokemon by id
    deletePokemon(id: string) {
        return this.pokemonCollection.doc(id).delete();
    }

    // add pokemon to firestore
    addPokemon(pokemon: { abilities: []; image: string; name: string; weight: number; height: number; }) {
        return this.pokemonCollection.add(pokemon);
    }

}
