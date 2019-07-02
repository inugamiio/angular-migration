import {AppComponent} from './app.component';


import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


/*
    providers: [
     {provide: APP_BASE_HREF, useValue:"/"}
    ],


    */
@NgModule({
    
    declarations: [AppComponent],
    bootstrap: [ AppComponent ],
    imports: [BrowserModule]
})
export class AppModule {}