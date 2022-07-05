import { NgModule } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCard } from './core/userCard/UserCard.component';
import { UserTable } from './core/userTable/UserTable.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhoneFormat } from './shared/pipes/PhoneFormat.pipe';
import { UserFileds } from './core/UserInputFields/UserInputFields.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCard,
    UserTable,
    UserFileds,
    PhoneFormat
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
