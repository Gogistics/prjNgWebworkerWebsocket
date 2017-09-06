import { TestBed, async } from '@angular/core/testing';
import { Server } from 'mock-socket';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const mockServer = new Server('ws://localhost:4200');
  mockServer.on('connection', server => {
    mockServer.send('test message 1');
    mockServer.send('test message 2');
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));

  it('should test websocket/socket.io successfully', async((done) => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const messageLen = component.messages.length;
      expect(messageLen).toBe(2);
      mockServer.stop(done);
    });
  }));
});
