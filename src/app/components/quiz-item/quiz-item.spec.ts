import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizItem } from './quiz-item';

describe('QuizItem', () => {
  let component: QuizItem;
  let fixture: ComponentFixture<QuizItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizItem],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
