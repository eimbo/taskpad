import { Injectable } from '@angular/core';
import { Note } from '../Note';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NoteService {

	notes?: Note[];

	private currNote = new Subject<Note>();

	currNote$ = this.currNote.asObservable();
	
	constructor() {
		//localStorage.clear()

		if (localStorage.getItem("notes") == null) {
			console.log('local storage null. setting storage')

			let temp: Note[] = [
				{
					'id': 1,
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

	ngOnInit() {}

	publishCurrNote(note: Note){
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
		let store = localStorage.getItem("notes") || '{}'
		let x = JSON.parse(store) 
		x = x.filter((y: Note) => y.title !== note.title)
		localStorage.setItem("notes", JSON.stringify(x))
	}

	updateNote(id: any, text: string): string {
		console.log(id + ": " + text)

		let store = localStorage.getItem("notes") || '{}'
		let x = JSON.parse(store) 
		x.filter( (n: any) => {
			if (n.id == id ) {
				n.text = text
			}
		})

		localStorage.setItem("notes", JSON.stringify(x))
		
		localStorage.setItem("notes", JSON.stringify(x))
		
		return ''
	
	}

	addNote(note: Note) {
		let store = localStorage.getItem("notes") || '{}'
		let x = JSON.parse(store) 
		x.push(note)
		localStorage.setItem("notes", JSON.stringify(x))
	}
}
