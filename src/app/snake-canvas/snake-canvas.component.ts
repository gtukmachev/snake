import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-snake-canvas',
  templateUrl: './snake-canvas.component.html',
  styleUrls: ['./snake-canvas.component.css']
})
export class SnakeCanvasComponent implements OnInit, OnDestroy {
  static startRadius = 15;

  @ViewChild('myCanvas') canvasRef: ElementRef;

  private xSize: number = 1000;
  private ySize: number = 800;

  protected running: boolean = false;

  private stepLength = 2;
  private stayCloneAfter = 7;
  private cycleFrameCounter = 0;
  private timerDelay = 20;
  protected lifeCounter: number = 0;
  protected snakeElements: SnakeElement[] = [];
  snakeLength: number = 20;

  protected mouseDown = false;
  protected mouseEvent: MouseEvent;
  protected mx = 0;
  protected my = 0;

  protected dx = 0;
  protected dy = 0;

  private gameTimer: Subscription;

  constructor () {
  }

  ngOnInit () {


  }

  private onMouse(event: MouseEvent) {
    if (!this.running) return;

    this.mouseEvent = event;
    this.mx = event.layerX;
    this.my = event.layerY;

    const head = this.snakeElements[this.snakeElements.length - 1];

    const vectorX = this.mx-head.x;
    const vectorY = this.my-head.y;

    const len = Math.sqrt( vectorX*vectorX + vectorY*vectorY );

    this.dx = ( vectorX / len ) * this.stepLength;
    this.dy = ( vectorY / len ) * this.stepLength;

  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if(this.mouseDown) this.onMouse(event);
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.mouseDown = true; this.onMouse(event);
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event) {
    this.mouseDown = false;
  }

  private gameStep(): void {
    if (!this.running) { return; }

    this.cycleFrameCounter = this.cycleFrameCounter + 1;

    let head = this.snakeElements[this.snakeElements.length-1];
    if (this.cycleFrameCounter >= this.stayCloneAfter) {
      this.cycleFrameCounter = 0;
      this.lifeCounter++;
      head = new SnakeElement(head.x, head.y, this.lifeCounter + this.snakeLength );
      this.snakeElements.push( head );
    }

    head.x += this.dx; head.x = Math.min(head.x, this.xSize); head.x = Math.max(head.x, 0);
    head.y += this.dy; head.y = Math.min(head.y, this.ySize); head.y = Math.max(head.y, 0);

    if (this.snakeElements[0].whenDie < this.lifeCounter) {
      this.snakeElements = this.snakeElements.slice(1, this.snakeElements.length);
    }
  }

  private paint(): void {
    // Check that we're still running.
    if (!this.running) return;

    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    // Draw background (which also effectively clears any previous drawing)
    ctx.fillStyle = '#fdffe3';
    ctx.fillRect(0, 0, this.xSize, this.ySize);

    this.drawSnake(ctx);

    requestAnimationFrame(() => this.paint());
  }

  private drawSnake (ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.snakeElements.length; i++) {
      const element = this.snakeElements[i];

      if (i == this.snakeElements.length - 1) {
        this.drawCircle(ctx, element.x, element.y, '#3a599a')
      } else {
        this.drawCircle(ctx, element.x, element.y, '#29b396')
      }
    }


  }

  private drawCircle (ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle: string | CanvasGradient | CanvasPattern) {
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.arc(x, y, SnakeCanvasComponent.startRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  public changeRun () {
    this.running = !this.running;
    if (this.running) {
      this.lifeCounter = 0;
      this.cycleFrameCounter = 0;
      this.snakeElements = [new SnakeElement(30,100, 10)];
      this.gameTimer = Observable.timer(500, this.timerDelay)
        .subscribe(
          () => this.gameStep()
        );
      this.paint();
    } else {
      this.gameTimer.unsubscribe();
    }
  }


  ngOnDestroy (): void {
    this.gameTimer.unsubscribe();
  }

  protected mouseJson(): string {

    return (this.mouseEvent == null) ? 'null' : JSON.stringify(this.mouseEvent)

  }

}


class SnakeElement {

  public x: number;
  public y: number;
  public whenDie: number;

  constructor (x: number, y: number, whenDie: number) {
    this.x = x;
    this.y = y;
    this.whenDie = whenDie;
  }
}
