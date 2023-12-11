import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidosShortcutsComponent } from './assistidos-shortcuts.component';

describe('AssistidosShortcutsComponent', () => {
  let component: AssistidosShortcutsComponent;
  let fixture: ComponentFixture<AssistidosShortcutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidosShortcutsComponent]
    });
    fixture = TestBed.createComponent(AssistidosShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
