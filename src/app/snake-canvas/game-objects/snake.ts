import {GameObject} from "./game-object";
import {Position} from "./position";
import {GameField} from "./game-field";

export class Snake extends GameObject {
  public isDrawable: boolean = true;

  snakeElements: SnakeElement[];

  snakeFat: number = 15;
  headColor: string | CanvasGradient | CanvasPattern = '#3a599a';
  bodyColor: string | CanvasGradient | CanvasPattern = '#29b396';

  speed: number = 2;      // movement speed (in pixels) of snake head by a turn
  speedVector: Position = new Position(1,0);
  currentLength: number = 10;

  stayCloneAfter = 7;
  cycleFrameCounter: number;
  lifeCounter: number;

  head: SnakeElement;

  constructor (field: GameField, x: number, y: number) {
    super(field, x, y);
    this.lifeCounter = 0;
    this.cycleFrameCounter = 0;
    this.head = new SnakeElement(field, x, y, this.currentLength)
    this.snakeElements = [this.head];
  }

  setDirection(x: number, y: number): void {
    const head = this.snakeElements[this.snakeElements.length - 1];

    const vectorX = x - head.position.x;
    const vectorY = y - head.position.y;

    const vectorLen = Math.sqrt( vectorX*vectorX + vectorY*vectorY );

    this.speedVector.x = ( vectorX / vectorLen ) * this.speed;
    this.speedVector.y = ( vectorY / vectorLen ) * this.speed;

  }

  draw () {

    for (let i = 0; i < this.snakeElements.length - 1; i++) {
      const element = this.snakeElements[i];
      this.drawCircle(element.position.x, element.position.y, this.snakeFat, this.bodyColor);
    }

    const head = this.snakeElements[this.snakeElements.length - 1];
    this.drawCircle(head.position.x, head.position.y, this.snakeFat, this.headColor);

  }

  beforeTurn (): void {
  }

  turn (): void {
    // move snake
    this.cycleFrameCounter = this.cycleFrameCounter + 1;

    if (this.cycleFrameCounter >= this.stayCloneAfter) {
      this.cycleFrameCounter = 0;
      this.lifeCounter++;
      this.head = new SnakeElement(this.field, this.head.position.x, this.head.position.y, this.lifeCounter + this.currentLength );
      this.snakeElements.push( this.head );
    }

    let x = this.head.position.x + this.speedVector.x;
    let y = this.head.position.y + this.speedVector.y;

    this.head.moveToSafe(x, y);

    if (this.snakeElements[0].whenDie < this.lifeCounter) {
      this.snakeElements = this.snakeElements.slice(1, this.snakeElements.length);
    }

  }

  afterTurn (): void {
  }


}

class SnakeElement extends GameObject{
  public isDrawable: boolean = false;
  public whenDie: number;


  constructor (field: GameField, x: number, y: number, whenDie: number) {
    super(field, x, y);
    this.whenDie = whenDie;
  }


  draw (): void {
  }

  beforeTurn (): void {
  }

  turn (): void {
  }

  afterTurn (): void {
  }
}
