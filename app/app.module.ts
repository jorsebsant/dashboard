import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { DayPilot }      from 'daypilot-pro-angular';

@NgModule({
    imports:      [ BrowserModule, HttpModule ],
    declarations: [ AppComponent, DayPilot.Angular.Scheduler ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }