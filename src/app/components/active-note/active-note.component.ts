import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Note } from '../../Note';
import { Subject, debounceTime, switchMap, takeUntil } from 'rxjs';


function sleep(ms: number): Promise<any> {
	return new Promise((res) => setTimeout(res, 100));
}


enum FormStatus {
	Saving = 'Saving..',
	Saved = 'Saved!',
	Idle = '',
}


@Component({
  selector: 'app-active-note',
  templateUrl: './active-note.component.html',
  styleUrls: ['./active-note.component.css']
})
export class ActiveNoteComponent {


  	note!: Note;

	//currNoteText!: string;

	form: FormGroup;
	private unsubscribe = new Subject<void>();
	
	constructor(private noteService: NoteService, private formBuilder: FormBuilder) {
		//this.noteService.getNotes().subscribe((x) => this.note = x[0])
		this.form = this.formBuilder.group({
			text: ""
		});
	}

	ngOnInit(): void {
		this.noteService.currNote$.subscribe( n => {
			this.note = n
			//this.currNoteText = this.note.text
		});

		this.formBuilder.group({
			text: []
		});

		this.form.valueChanges.pipe(
			debounceTime(500),
			switchMap(formValue => this.noteService.updateNote(this.note.id, formValue.text)),
			takeUntil(this.unsubscribe))
			.subscribe(async () => {
				await sleep(2000);
			});
				
	}
		
	




}


