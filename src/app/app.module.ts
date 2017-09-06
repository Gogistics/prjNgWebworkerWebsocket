import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WorkerAppModule } from '@angular/platform-webworker';
import { AppComponent } from './app.component';

// import different modules based on the environments
import { environment } from 'environments/environment';
let importedModules = [];
if (environment.production) {
  importedModules.push(WorkerAppModule);
} else {
  importedModules.push(BrowserModule);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: importedModules,
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
