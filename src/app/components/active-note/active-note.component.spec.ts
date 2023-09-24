import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveNoteComponent } from './active-note.component';

describe('ActiveNoteComponent', () => {
  let component: ActiveNoteComponent;
  let fixture: ComponentFixture<ActiveNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
