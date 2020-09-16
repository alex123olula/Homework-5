import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './mat/mat.module';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AngularFireModule } from '@angular/fire';
import { AlbumsService } from './services/albums.service';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormComponent } from './components/form/form.component';
import {HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonService } from './services/pokemon.service';
import { PokemonAbilitiesPipe } from './pipes/pokemon-abilities.pipe';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { PokemonFirestoreService } from './services/pokemon-firestore.service';


@NgModule({
    declarations: [
        AppComponent,
        AlbumListComponent,
        ToolbarComponent,
        FormComponent,
        PokemonComponent,
        PokemonComponent,
        PokemonAbilitiesPipe,
        PokemonFormComponent,




    ],
    imports        : [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.configFirebase),
        FormsModule,
        MatModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        ReactiveFormsModule,
        HttpClientModule,

    ],
    providers      : [AlbumsService, PokemonService, PokemonFirestoreService,
        {
            provide : MatDialogRef,
            useValue: []
        },
        {
            provide : MAT_DIALOG_DATA,
            useValue: []
        }],
    bootstrap      : [AppComponent],
    entryComponents: [FormComponent, PokemonFormComponent]
})
export class AppModule {
}
