import { Component } from '@angular/core';

@Component({
  selector: 'fluix-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fluix';

  c() {
    console.log('s');
  }
}
