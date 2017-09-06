import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  messages = [];
  constructor(private sanitizer: DomSanitizer) {};
  ngOnInit() {
    const chatSocket = new WebSocket('ws://localhost:4200');
    chatSocket.onmessage = (event) => {
      this.messages.push(event.data);
    };
  }
}
