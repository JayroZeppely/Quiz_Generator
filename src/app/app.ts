import { Component, signal } from '@angular/core';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [Home]
})

export class App {
  protected readonly title = signal('quiz');
}
