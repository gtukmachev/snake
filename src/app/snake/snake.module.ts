import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCanvasComponent } from './snake-canvas/game-canvas.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    GameCanvasComponent
  ],
  declarations: [
    GameCanvasComponent
  ]
})
export class SnakeModule { }
