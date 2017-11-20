import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Snake} from "./game-objects/snake";
import {SnakeGameField} from "./game-objects/snake-game-field";
import {BackGround} from "./game-objects/back-ground";
import {FoodManager} from "./game-objects/food/food-manager";

@Component({
  selector: 'app-snake-canvas',
  templateUrl: './snake-canvas.component.html',
  styleUrls: ['./snake-canvas.component.css']
})
export class SnakeCanvasComponent implements OnInit, OnDestroy {

  @ViewChild('myCanvas') canvasRef: ElementRef;

  xSize: number = 1000;
  ySize: number = 800;

  running: boolean = false;

  gameField: SnakeGameField;
  backGround: BackGround;
  snake: Snake;
  foodManager: FoodManager;

  snakeLength: number = 20;
  timerDelay = 20;


  gameTimer: Subscription;

  constructor () {
  }

  ngOnInit () {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    this.gameField = new SnakeGameField(ctx, this.xSize, this.ySize);

    this.backGround  = new  BackGround(this.gameField);
    this.snake       = new       Snake(this.gameField, this.xSize / 2, this.ySize / 2 );
    this.foodManager = new FoodManager(this.gameField);

    this.gameField.add( this.foodManager);
    this.gameField.add( this.backGround );
    this.gameField.add( this.snake      );

  }

  private onMouse(event: MouseEvent) {
    if (!this.running) return;
    this.snake.setDirection(event.layerX, event.layerY);
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.onMouse(event);
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.onMouse(event);
  }

  private gameStep(): void {
    if (!this.running) { return; }
    this.gameField.gameActionTurn();
  }

  private paint(): void {
    if (!this.running) return;
    this.gameField.gameFrameDraw();
    requestAnimationFrame(() => this.paint());
  }

  public startGame(): void {
    if (this.running) return;

    this.gameTimer = Observable.timer(500, this.timerDelay)
      .subscribe(
        () => this.gameStep()
      );

    this.running = true;
    this.paint();
  }

  public pauseGame(): void {
    this.running = false;
    this.gameTimer.unsubscribe();

  }

  public changeRun () {
      if (this.running) { this.pauseGame(); }
                   else { this.startGame(); }
  }

  ngOnDestroy (): void {
    this.gameTimer.unsubscribe();
  }

}


