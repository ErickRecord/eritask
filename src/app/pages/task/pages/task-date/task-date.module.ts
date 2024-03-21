import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskDatePageRoutingModule } from './task-date-routing.module';

import { TaskDatePage } from './task-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskDatePageRoutingModule
  ],
  declarations: [TaskDatePage]
})
export class TaskDatePageModule {}
