import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnakeCanvasComponent } from './snake-canvas/snake-canvas.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SnakeCanvasComponent
  ],
  declarations: [
    SnakeCanvasComponent
  ]
})
export class SnakeModule { }
