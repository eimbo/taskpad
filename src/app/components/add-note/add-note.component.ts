import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Note } from '../../Note';


@Component({
  selector: 'app-add-note',
  template: `
	<div class="form-container">
	<form *ngIf="showAddNote" [formGroup]="noteForm" (ngSubmit)="submit()">
		<input type="text" id="new-title" formControlName="newTitle" placeholder="Add Note"/>
		<input id="save-button" type="submit" value="Add+"/>
	</form>
	</div>
  `,
  styles: [`
	.form-container {
	display: flex;
	justify-content: center;
	
	align-items: center;
	}
	input {
		font-size: 20px;
		align-self: center;
	}
	#save-button {
		display: inline-block;
		padding: 1px 10px;
		color: gray;
		align-self: center;
		text-align: center;
	}
  `]
})
export class AddNoteComponent {

	@Output() onSubmit: EventEmitter<Note> = new EventEmitter();

	note?: Note;

	showAddNote: boolean = true;

	noteForm: FormGroup

	constructor(fb: FormBuilder) {
		this.noteForm = fb.group({
			'newTitle': ['']
		})
	}


	submit(): void  {
		//console.log(this.noteForm.value.newTitle)
		if(this.noteForm.value.newTitle.trim() !== ''){

			this.note = {id: 234, title: this.noteForm.value.newTitle, text: ''}
			this.noteForm.value.newTitle = ''
			this.onSubmit.emit(this.note)
		}
		
		return;
	}
}
