import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistidoAddComponent } from './assistido-add.component';
import { AppModule } from 'src/app/app.module';

describe('AssistidoAddComponent', () => {
  let component: AssistidoAddComponent;
  let fixture: ComponentFixture<AssistidoAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidoAddComponent],
      imports: [AppModule]
    });
    fixture = TestBed.createComponent(AssistidoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
