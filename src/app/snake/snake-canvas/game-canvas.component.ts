import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SnakeGame} from './game-objects/snake-game';
import {CachedFilmGameObject} from '../../game-core/cached-film-game-object';

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.css']
})
export class GameCanvasComponent implements OnInit, OnDestroy {

  @ViewChild('myCanvas') canvasRef: ElementRef;

  xSize: number = 960;
  ySize: number = 540;

  game: SnakeGame;

  constructor () {
  }

  ngOnInit () {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    this.xSize = this.canvasRef.nativeElement.width;
    this.ySize = this.canvasRef.nativeElement.height;

    this.game = new SnakeGame(ctx, this.xSize, this.ySize);

  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.game.onMouseMove(event);
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.game.onMouseDown(event);
  }

  ngOnDestroy (): void {
    this.game.onDestroy();
  }

  public CachedFilmGameObjectFCL(): number {
    return Object.keys(CachedFilmGameObject.framesCache).length;
  }

}


