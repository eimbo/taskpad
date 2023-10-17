import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteItemComponent } from './components/note-item/note-item.component';
import { ActiveNoteComponent } from './components/active-note/active-note.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteItemComponent,
    ActiveNoteComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	ReactiveFormsModule,
 	FontAwesomeModule,
	
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
