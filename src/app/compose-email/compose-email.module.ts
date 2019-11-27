import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComposeEmailPage } from './compose-email.page';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComposeEmailPage
      }
    ]),
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [ComposeEmailPage]
})
export class ComposeEmailPageModule {}
