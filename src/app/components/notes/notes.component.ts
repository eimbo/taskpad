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

	constructor(private noteService: NoteService) {
		
	}
	
	ngOnInit(): void {
		// this.notes = this.noteService.getNotes(); // removed because we want to use Observables 
		this.noteService.getNotes().subscribe((notes) => this.notes = notes ); // using Observables
	}

	deleteNote(note: Note) {
		this.noteService.deleteNote(note)
		this.notes?.filter((n) => n.id !== note.id)
	}

	addNote(note: Note) {

	}
	
	onSelect(note: Note) {
		
		console.log('notes.ts > onSelect. publishing note to noteService: ' + note.title)
		this.noteService.publishCurrNote(note);
	}

	onDelete(note: Note){
		this.noteService.deleteNote(note)
		this.notes = this.notes?.filter((n) => n.title !== note.title)
	}

	addNewNote(value: string) {
		if(value.trim() == ''){
			return 
		}
		let note: Note = {id: uuidv4(), title: value, text: ''}
		console.log(value)
		
		this.noteService.addNote(note)
		this.notes?.push(note)
		
		
	}

}
