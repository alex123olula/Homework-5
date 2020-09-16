import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonAbilities'
})
export class PokemonAbilitiesPipe implements PipeTransform {

  transform(abilities: any[]): string {
    return (abilities || []).map(a => a.ability.name).join(', ');
  }

}
