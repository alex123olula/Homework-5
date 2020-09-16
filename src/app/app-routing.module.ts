import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './components/album-list/album-list.component';

import { PokemonComponent } from './components/pokemon/pokemon.component';


const routes: Routes = [
  {path: 'albums', component: AlbumListComponent},
  {path: 'pokemon', component: PokemonComponent},
  {path: '', pathMatch: 'full', redirectTo: 'albums'},
  {path: '**', pathMatch: 'full', redirectTo: 'albums'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
