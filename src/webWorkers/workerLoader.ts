/* workerLoader */
import '../polyfills.ts';
import '@angular/core';
import '@angular/common';
import { platformWorkerAppDynamic } from '@angular/platform-webworker-dynamic';
import { AppModule } from '../app/app.module';

// use platformWorkerAppDynamic instead of platformBrowserDynamic
platformWorkerAppDynamic().bootstrapModule(AppModule);