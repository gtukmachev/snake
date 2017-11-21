import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Snake} from './game-objects/snake';
import {SnakeGame} from './game-objects/snake-game';
import {SimpleBackGround} from '../../game-core/simple-back-ground';
import {FoodManager} from './game-objects/food/food-manager';
import {TimeCounter} from "../../game-core/time-counter";

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.css']
})
export class GameCanvasComponent implements OnInit, OnDestroy {

  @ViewChild('myCanvas') canvasRef: ElementRef;

  xSize: number = 960;
  ySize: number = 540;

  running: boolean = false;

  secondsTimerCounter = new TimeCounter(1000); // every second
  framesCounter = 0;
  turnsCounter = 0;

  framesPerSecond = 0;
  turnsPerSecond = 0;
  frameDuration = 0;

  snakeGame: SnakeGame;
  backGround: SimpleBackGround;
  snake: Snake;
  foodManager: FoodManager;

  gameTimeFrame = 1;


  gameTimer: Subscription;

  constructor () {
  }

  ngOnInit () {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    console.log(this.canvasRef.nativeElement);

    this.xSize = this.canvasRef.nativeElement.width;
    this.ySize = this.canvasRef.nativeElement.height;

    this.snakeGame = new SnakeGame(ctx, this.xSize, this.ySize);

    this.backGround  = new  SimpleBackGround(this.snakeGame, '#fdffe3');
    this.snake       = new       Snake(this.snakeGame, this.xSize / 2, this.ySize / 2 );
    this.foodManager = new FoodManager(this.snakeGame);

    this.snakeGame.add( this.foodManager);
    this.snakeGame.add( this.backGround );
    this.snakeGame.add( this.snake      );


    this.secondsTimerCounter.isItTime();
    this.secondsTimerCounter.fixLastChecking();
    Observable.timer(1000, 1000).subscribe(() => {
      if (this.secondsTimerCounter.isItTime()) {
        this.frameDuration = this.secondsTimerCounter.lastDuration;

        this.framesPerSecond = this.framesCounter;
        this.framesCounter = 0;

        this.turnsPerSecond = this.turnsCounter;
        this.turnsCounter = 0;


      }
    });
  }

  private onMouse(event: MouseEvent) {
    if (!this.running) { return; }
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
    this.snakeGame.gameActionTurn();
    this.turnsCounter++;
  }

  private paint(): void {
    if (!this.running) { return; }
    this.snakeGame.gameFrameDraw();
    this.framesCounter ++;
    requestAnimationFrame(() => this.paint());
  }

  public startGame(): void {
    if (this.running) { return; }

    this.gameTimer = Observable.timer(500, this.gameTimeFrame)
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

  public toggleStartPause () {
      if (this.running) {
                this.pauseGame();
      } else {
                this.startGame();
      }
  }

  ngOnDestroy (): void {
    this.gameTimer.unsubscribe();
  }

}


