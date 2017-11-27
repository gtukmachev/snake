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



  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public gameObjects: GameObject[] = [];
  public gameObjectsForDelete: GameObject[] = [];
  public mousePos: Pos = new Pos(0, 0);

  public worldSize: Pos = new Pos(0, 0);

  public cameraInitialPos: Pos; // center of rendered canvas
  public cameraPos: Pos; // in the beggining - this pos will be in center of rendered canvas
  public cameraShift = new Pos(0,0); //
  public cameraActorFrame: Pos; // frame size around camera where actor can move without camera movement
  public canersViewFrameSize: Pos; //

  public actor: GameObject; // main game object - camera will follow this object

  constructor (canvas: HTMLCanvasElement, xSize: number, ySize: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.worldSize.x = xSize;
    this.worldSize.y = ySize;
    this.cameraPos = new Pos( Math.floor(canvas.width / 2), Math.floor(canvas.height / 2) );
    this.cameraInitialPos = new Pos( this.cameraPos.x, this.cameraPos.y );
    this.cameraActorFrame = new Pos( Math.floor(canvas.width / 9), Math.floor(canvas.height / 8) );

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
    if (this.actor) { this.followActor() }
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.beforeTurn() ); this.deleteMarkedElements();
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.turn() );       this.deleteMarkedElements();
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.afterTurn() );  this.deleteMarkedElements();
  }

  private followActor(): void {
    const p = this.actor.p;

    if (p.x < this.cameraPos.x - this.cameraActorFrame.x) {
      this.cameraPos.x = Math.floor(p.x + this.cameraActorFrame.x);
      this.cameraShift.x = this.cameraInitialPos.x - this.cameraPos.x;
    } else if (p.x > this.cameraPos.x + this.cameraActorFrame.x) {
      this.cameraPos.x = Math.floor(p.x - this.cameraActorFrame.x);
      this.cameraShift.x = this.cameraInitialPos.x - this.cameraPos.x;
    }

    if (p.y < this.cameraPos.y - this.cameraActorFrame.y) {
      this.cameraPos.y = Math.floor(p.y + this.cameraActorFrame.y);
      this.cameraShift.y = this.cameraInitialPos.y - this.cameraPos.y;
    } else if (p.y > this.cameraPos.y + this.cameraActorFrame.y) {
      this.cameraPos.y = Math.floor(p.y - this.cameraActorFrame.y);
      this.cameraShift.y = this.cameraInitialPos.y - this.cameraPos.y;
    }

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
    this.mousePos.x = event.layerX - this.cameraShift.x;
    this.mousePos.y = event.layerY - this.cameraShift.y;
  }

  public onMouseDown(event: MouseEvent): void {
    this.mousePos.x = event.layerX - this.cameraShift.x;
    this.mousePos.y = event.layerY - this.cameraShift.y;
  }

  public onDestroy(): void {
    this.gameTimer.unsubscribe();
    this.framesCounterSubscription.unsubscribe();
  }

}
