import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AssistidosEditComponent } from './assistidos-edit.component';
import { AppModule } from 'src/app/app.module';

describe('AssistidosEditComponent', () => {
  let component: AssistidosEditComponent;
  let fixture: ComponentFixture<AssistidosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssistidosEditComponent],
      imports: [AppModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test'
              }
            }
          }
        }
      ]
    });
    fixture = TestBed.createComponent(AssistidosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
