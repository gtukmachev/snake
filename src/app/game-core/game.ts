import {GameObject} from './game-object';
import {Pos} from './position';
import {TimeCounter} from './time-counter';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs';
export class Game {

  running: boolean = false;

  secondsTimerCounter = new TimeCounter(1000); // every second
  framesCounter = 0;
  turnsCounter = 0;
  framesPerSecond = 0;
  turnsPerSecond = 0;
  lastFrameDuration = 0;
  framesCounterSubscription: Subscription;

  gameTimeFrame = 1;
  gameTimer: Subscription;


  public ctx: CanvasRenderingContext2D;
  public gameObjects: GameObject[] = [];
  public gameObjectsForDelete: GameObject[] = [];
  public size: Pos = new Pos(0, 0);
  public mousePos: Pos = new Pos(0, 0);

  constructor (ctx: CanvasRenderingContext2D, xSize: number, ySize: number) {
    this.ctx = ctx;
    this.size.x = xSize;
    this.size.y = ySize;

  }

  private gameStep(): void {
    if (!this.running) { return; }
    this.gameActionTurn();
    this.turnsCounter++;
  }

  private paint(): void {
    if (!this.running) { return; }
    this.gameFrameDraw();
    this.framesCounter ++;
    requestAnimationFrame(() => this.paint());
  }

  public startGame(): void {
    if (this.running) { return; }

    this.gameTimer = Observable.timer(500, this.gameTimeFrame)
      .subscribe(
        () => this.gameStep()
      );

    this.secondsTimerCounter.isItTime();
    this.secondsTimerCounter.fixLastChecking();

    this.framesCounterSubscription = Observable.timer(1000, 1000).subscribe(() => {
      if (this.secondsTimerCounter.isItTime()) {
        this.secondsTimerCounter.fixLastChecking();
        this.lastFrameDuration = this.secondsTimerCounter.lastDuration;

        this.framesPerSecond = Math.floor(this.framesCounter / this.lastFrameDuration * 1000);
        this.framesCounter = 0;

        this.turnsPerSecond = Math.floor(this.turnsCounter / this.lastFrameDuration * 1000);
        this.turnsCounter = 0;


      }
    });


    this.running = true;
    this.paint();
  }

  public pauseGame(): void {
    this.running = false;
    this.gameTimer.unsubscribe();
    this.framesCounterSubscription.unsubscribe();
  }

  public toggleStartPause () {
    if (this.running) {
      this.pauseGame();
    } else {
      this.startGame();
    }
  }

  public gameActionTurn(): void {
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.beforeTurn() ); this.deleteMarkedElements();
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.turn() );       this.deleteMarkedElements();
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.afterTurn() );  this.deleteMarkedElements();
  }

  public gameFrameDraw(): void {
    this.gameObjects.forEach( (gameObject: GameObject) => {
      if (gameObject.isDrawable) { gameObject.draw(); }
    });
  }

  public add(gameObject: GameObject): void {
    this.gameObjects.push( gameObject );
  }

  protected del(gameObject: GameObject): void {
    this.rmFromArr(this.gameObjects, gameObject);
  }

  protected rmFromArr(arr: any[], obj: any) {
    const i = arr.indexOf(obj);
    if (i !== -1) { arr.splice(i, 1); }
  }

  public markForDelete(gameObject: GameObject): void {
    this.gameObjectsForDelete.push( gameObject );
  };

  private deleteMarkedElements(): void {
    if (this.gameObjectsForDelete.length === 0) { return; }

    this.gameObjectsForDelete.forEach( it => this.del( it ) );
  }

  public onMouseMove(event: MouseEvent): void {
    this.mousePos.x = event.layerX;
    this.mousePos.y = event.layerY;
  }

  public onMouseDown(event: MouseEvent): void {
    this.mousePos.x = event.layerX;
    this.mousePos.y = event.layerY;
  }

  public onDestroy(): void {
    this.gameTimer.unsubscribe();
    this.framesCounterSubscription.unsubscribe();
  }

}
