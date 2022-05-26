import { Component } from '@angular/core';
import { FilmsService } from './films.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Films } from './Films';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})

export class FilmsComponent {
  successMessage: string = "";
  errorMessage: string = "";
  constructor(private filmsService: FilmsService, private fb: FormBuilder, public dialog: MatDialog) { }
  updateStats : string="";
  updateForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    stars: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
  });

  insertForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    stars: new FormControl('', Validators.required),
    director: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
  });
  searchByIdForm = new FormGroup({
    id: new FormControl('')
  });
  searchByTitleForm = new FormGroup({
    title: new FormControl('')
  });

  films: any = [];
  searchedFilms: Films[] | undefined;


  ngOnInit(): void {
    this.filmsService.getAllFilms().subscribe(
      fil => {
        this.films = fil
      }
    );
  }

  updateFilm(data: any) {
    console.log(data)
    this.filmsService.updateFilm(data).subscribe(
      (stats) => this.deleteStatus = stats
    );
  }
  addSubmit(data: any) {
    this.filmsService.insertFilm(data).subscribe();
  }
  searchedFilm: Films | undefined;
  searchById(data: any) {
    console.log(data.id)
    this.filmsService.getFilm(data.id).subscribe(
      (fil) => this.searchedFilm = fil
    );
    this.openSearchPopup();
  }
  searchTitle: boolean = false;
  searchByTitle(data: any) {
    console.log(data.title)
    this.filmsService.searchFilm(data.title).subscribe(
      (fil) => this.searchedFilms = fil
    );
    this.searchTitle = true;
  }
  displayStyle = "none";
  deleteFilmId: number | undefined;
  openUpdatePopup() {
    this.displayStyle = "block";
  }
  closeUpdatePopup() {
    this.displayStyle = "none";
    this.updateForm.reset();
  }
  deletePopup = "none";
  deleteStatus: string = "";
  openDeletePopup(id: number) {
    this.deletePopup = "block";
    this.deleteFilmId = id;
  }
  closeDeletePopup() {
    this.deletePopup = "none";
  }

  deleteFilm() {
    if (this.deleteFilmId != undefined) {
      this.filmsService.deleteFilm(this.deleteFilmId).subscribe(
        (stat) => this.deleteStatus = stat
      );
    }
    this.deleteFilmId = undefined;
  }

  viewFilms: boolean = false;
  addFilm: boolean = false;
  choice: boolean = true;
  viewAllFilms() {
    this.viewFilms = true;
    this.addFilm = false;
    this.choice = false;
  }
  insertStyle = "none";
  openInsertPopup() {
    this.insertStyle = "block";
    this.viewFilms = false;
    this.addFilm = true;
    this.choice = false;
  }
  closeInsertPopup() {
    this.insertStyle = "none";
    this.choice = true;
    this.insertForm.reset();
  }
  searchStyle = "none";
  searchFilm: boolean = false;
  openSearchPopup() {
    this.searchStyle = "block";
    this.searchFilm = true;
    this.choice = false;
  }
  closeSearchPopup() {
    this.searchStyle = "none";
    this.choice = true;
    this.searchFilm = false;
    this.searchByIdForm.reset();
    this.searchByTitleForm.reset();
    this.searchedFilm = undefined;
    this.searchTitle = false;
  }
  home() {
    this.choice = true;
    this.viewFilms = false;
  }


}