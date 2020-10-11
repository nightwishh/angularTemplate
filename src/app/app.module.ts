import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthTest1Component } from './modules/auth-test1/auth-test1.component';
import { LoginComponent } from './modules/login/login.component';
import { AccessGuard } from './AccessGuard/access.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthTest1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
