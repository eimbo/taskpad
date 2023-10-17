import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Observable } from 'rxjs';
import { Note } from '../../Note';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
	notes!: Note[];

	currSelectedNoteId: string = '';

	constructor(private noteService: NoteService) {
		
	}
	
	ngOnInit(): void {
		// this.notes = this.noteService.getNotes(); // removed because we want to use Observables 
		this.noteService.getNotes().subscribe((notes) => this.notes = notes ); // using Observables
	}
	
	onSelect(note: Note) {
		this.currSelectedNoteId = note.id;
		//console.log('notes.ts > onSelect. publishing note to noteService: ' + note.title)
		this.noteService.publishCurrNote(note);
	}

	onDelete(note: Note){
		if(confirm("Are you sure you want to delete \'" + note.title + "\'") == true) {
			// remove text from main content
			note.text = '';
			this.noteService.publishCurrNote(note);

			this.noteService.deleteNote(note)
			this.notes = this.notes?.filter((n) => n.id !== note.id)
		}
	}

	isSelected(id: string) {
		return this.currSelectedNoteId == id ? true : false;
	}
	addNewNote(value: string) {
		if(value.trim() == ''){
			return 
		}
		let note: Note = {id: uuidv4(), title: value, text: ''}
		//console.log(value)
		
		this.noteService.addNote(note)
		this.notes?.push(note)
		
		
	}

}
