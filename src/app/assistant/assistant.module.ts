import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollTopModule } from 'primeng/scrolltop';


import { AssistantComponent } from './assistant.component';

const route = [
  { path: '', component: AssistantComponent, pathmatch: 'full' }
]


@NgModule({
  declarations: [AssistantComponent],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    CommonModule,
    RouterModule.forChild(route),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    FontAwesomeModule,
    InputTextModule,
    ScrollTopModule
  ]
})
export class AssistantModule { }
