import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapWorkerUi } from '@angular/platform-webworker';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// bootstrap the module based on the environments
if (environment.production) {
  enableProdMode();
  bootstrapWorkerUi('webworker.bundle.js');
} else {
  platformBrowserDynamic().bootstrapModule(AppModule);
}
