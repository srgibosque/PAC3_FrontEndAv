import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './Components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FormatDatePipe } from './Pipes/format-date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CardComponent,
    FormatDatePipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CardComponent,
    CommonModule,
  ],
})
export class SharedModule {}