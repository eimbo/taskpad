import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Observable } from 'rxjs';
import { Note } from '../../Note';

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
		this.noteService.getNotes().subscribe((notes) => this.notes = notes ); // usinb Observables

		
	}

	deleteNote(note: Note) {
		this.noteService.deleteNote(note)
		this.notes?.filter((n) => n.id !== note.id)
	}

	addNote(note: Note) {
		this.noteService.addNote(note)
		this.notes?.push(note)
	}
	
	onSelect(note: Note) {
		console.log(12333)
		this.noteService.publishCurrNote(note);
	}

	onDelete(note: Note){
		this.noteService.deleteNote(note)
		this.notes = this.notes?.filter((n) => n.title !== note.title)
	}


}
