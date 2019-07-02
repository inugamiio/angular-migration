import {Component, Injectable} from '@angular/core';

@Component({
  selector: 'app-component',
  template: '<div>Hello {{ name }}!</div>',
})
@Injectable()
export class AppComponent {
  name: string = 'world';
}
