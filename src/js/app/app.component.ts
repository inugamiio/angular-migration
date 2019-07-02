import {Component, Injectable} from '@angular/core';

@Component({
  selector: 'app-component',
  template: '<h1>Hello {{ name }}!</h1>',
})
@Injectable()
export class AppComponent {
  name: string = 'world';
}
