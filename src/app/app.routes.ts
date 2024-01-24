import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: ()=> import("./assistant/assistant.module").then((m => m.AssistantModule)) }
];
