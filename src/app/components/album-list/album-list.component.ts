import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlbumsService } from '../../services/albums.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
    selector   : 'app-album-list',
    templateUrl: './album-list.component.html',
    styleUrls  : ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'band', 'genre', 'label', 'producer', 'actions'];
    dataSource                 = new MatTableDataSource();

    constructor(
        private albumService: AlbumsService,
        private dialog: MatDialog) { }

    ngOnInit(): void {
        this.getData();
    }

    // get data from album service
    getData() {
        this.albumService.getAllAlbums().subscribe(res => this.dataSource.data = res);
    }

    // calling modal for create new album
    newAlbum() {
        this.openModal();
        this.resetForm();
        this.getData();
    }

    // calling modal for edit album
    onEdit(element) {
        this.openModal();
        if (element) {
            this.albumService.selected = element;
        }
    }

    // delete album by id
    onDelete(id: string) {
        return this.albumService.deleteAlbum(id);
    }

    // modal
    openModal(): void {
        const dialogConfig     = new MatDialogConfig();
        dialogConfig.data      = {
            title: 'Modal'
        };
        dialogConfig.autoFocus = true;
        this.dialog.open(FormComponent, dialogConfig);
    }

    resetForm(): void {
        this.albumService.selected.name     = '';
        this.albumService.selected.band     = '';
        this.albumService.selected.producer = [];
        this.albumService.selected.label    = [];
        this.albumService.selected.genre    = [];
        this.albumService.selected.id       = null;
    }
}
