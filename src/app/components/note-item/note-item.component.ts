import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../Note';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
	@Input() note!: Note;
	@Input() isSelected: boolean = false;
	@Output() onSelect: EventEmitter<Note> = new EventEmitter();
	@Output() onDelete: EventEmitter<Note> = new EventEmitter();

	faTimes = faTimes;

	constructor() {}

	delete() {
		this.onDelete.emit(this.note);
	}

	select() {
		this.onSelect.emit(this.note);
	}



}
