import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlbumI } from '../models/album.interface';

export interface AlbumId extends AlbumI {
    id: string;
}

@Injectable({
    providedIn: 'root'
})
export class AlbumsService {
    albums: Observable<AlbumId[]>;
    public selected = {
        id      : null,
        name    : '',
        band    : '',
        genre   : [],
        label   : [],
        producer: []
    };
    private albumCollection: AngularFirestoreCollection<AlbumI>;

    constructor(private readonly afs: AngularFirestore) {
        this.albumCollection = afs.collection<AlbumI>('albums');
        this.albums          = this.albumCollection.snapshotChanges().pipe(
            map(action => action.map(a => {
                const data = a.payload.doc.data() as AlbumI;
                const id   = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    getAllAlbums() {
        return this.albums;
    }

    editAlbum(album: AlbumId) {
        console.log(album);

        return this.albumCollection.doc(album.id).update(album);
    }

    deleteAlbum(id: string) {
        return this.albumCollection.doc(id).delete();
    }

    addAlbum(album: { name: string; band: string; label: any[]; genre: any[]; producer: any[]; }) {

        return this.albumCollection.add(album);

    }

}
