import {SnakeGame} from './snake-game';
import {GameObject} from '../../../game-core/game-object';
import {Pos} from '../../../game-core/position';
import {Game} from '../../../game-core/game';

export class Snake extends GameObject {
  public isDrawable: boolean = true;

  snakeElements: SnakeElement[];

  snakeFat: number = 15;
  headColor: string | CanvasGradient | CanvasPattern = '#3a599a';
  bodyColors: Array<string> = ['#29b396', '#29c3a6', '#2cdabd', '#2debce', '#2effe1',
                               '#2debce', '#2cdabd', '#29c3a6' ];

  currentLength: number = 10;

  stayCloneAfter = 7;
  cycleFrameCounter: number;
  lifeCounter: number;

  head: SnakeElement;

  constructor (field: SnakeGame, x: number, y: number) {
    super(field, x, y);
    this.lifeCounter = 0;
    this.cycleFrameCounter = 0;
    this.head = new SnakeElement(field, x, y, this.currentLength)
    this.snakeElements = [this.head];
  }

  increaseSnakeLength(onLength: number):void {
    this.lifeCounter -= onLength;
    this.currentLength += onLength;
    this.snakeFat = 14 + this.currentLength / 10;
  }

  draw () {

    for (let i = 0; i < this.snakeElements.length - 1; i++) {
      const element = this.snakeElements[i];
      this.drawCircle(element.position.x, element.position.y, this.snakeFat, this.bodyColors[ i %  this.bodyColors.length ]);
      this.strokeCircle(element.position.x, element.position.y, this.snakeFat, this.headColor);
    }

    const head = this.snakeElements[this.snakeElements.length - 1];
    this.drawCircle(head.position.x, head.position.y, this.snakeFat, this.headColor);

    const eyeRadius = this.snakeFat / 3;
    const backOffset = eyeRadius / 3;
    const eyeRadius1 = eyeRadius / 2;
    const angle = Math.PI / 7;

    const f = this.field.ctx;
    f.save();
    f.translate(head.position.x, head.position.y);
    const centerEye = this.snakeFat-backOffset;
    const centerEye1 = centerEye + eyeRadius - eyeRadius1;
    const eyeX = this.directionVector.x * centerEye;
    const eyeY = this.directionVector.y * centerEye;
    const eyeX1 = this.directionVector.x * centerEye1;
    const eyeY1 = this.directionVector.y * centerEye1;


    f.rotate(angle);
    this.drawCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.drawCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    this.drawCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.drawCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    this.drawCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.drawCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    f.rotate(-2 * angle);
    this.drawCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.drawCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    f.restore();
    //f.fi

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

export class SnakeElement extends GameObject{
  public isDrawable: boolean = false;
  public whenDie: number;


  constructor (field: Game, x: number, y: number, whenDie: number) {
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
