import { Injectable } from '@angular/core';
import { Note } from '../Note';
import { Observable, Subject, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
	providedIn: 'root'
})
export class NoteService {

	notes?: Note[];

	private currNote = new Subject<Note>();

	currNote$ = this.currNote.asObservable();
	
	constructor() {
		//localStorage.clear()
		console.log('note.service.ts > constructor')
		if (localStorage.getItem("notes") == null) {
			console.log('local storage null. setting storage and init \'Getting Started\'')

			let temp: Note[] = [
				{
					'id': uuidv4(),
					'title': 'Getting Started',
					'text': 'Welcome to TaskPad!',
				},
			]
			localStorage.setItem("notes", JSON.stringify(temp));
		} else {
			//console.log("notes in localstorage")
			//console.log(localStorage.getItem("notes"))
		}


	}

	ngOnInit() {
		// NEVER RUNS
		console.log('note.service.ts > ngOnInit')

	}

	publishCurrNote(note: Note){
		console.log('publishCurrNote: ' + note.title)
		this.currNote.next(note);
	}

	getNotes(): Observable<Note[]> {

		let dat = localStorage.getItem("notes")
		let x;
		//console.log(typeof (dat))
		if (dat != null) {
			//console.log(dat.length)
			x = JSON.parse(dat)
			//console.log(x[0])
		}

		const n = of(x);
		return n;
	}


	deleteNote(note: Note) {
		console.log('deleteNote: ' + note.title)
		let store = localStorage.getItem("notes") || '{}'
		let x = JSON.parse(store) 
		x = x.filter((y: Note) => y.id !== note.id)
		localStorage.setItem("notes", JSON.stringify(x))
	}

	updateNote(id: string, text: string): string {


		let store = localStorage.getItem("notes") || '{}'
		let x = JSON.parse(store) 
		x.filter( (n: any) => {
			if (n.id === id ) {
	
				n.text = text
				console.log('updateNote ' + n.title)
			

			}
		})

		localStorage.setItem("notes", JSON.stringify(x))
		
		//localStorage.setItem("notes", JSON.stringify(x))
		
		return ''
	
	}

	addNote(note: Note) {
		console.log('addNote: ' + note.title)
		let store = localStorage.getItem("notes") || '{}'
		let x = JSON.parse(store) 
		x.push(note)
		localStorage.setItem("notes", JSON.stringify(x))
	}
}
