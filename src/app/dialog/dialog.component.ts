import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faDragon, faRobot } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [BrowserModule, BrowserAnimationsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faDragon,
      faRobot
    );
  }
}
