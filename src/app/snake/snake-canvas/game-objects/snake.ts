import {SnakeGame} from './snake-game';
import {GameObject} from '../../../game-core/game-object';
import {Pos} from '../../../game-core/position';

export class Snake extends GameObject {
  public isDrawable: boolean = true;

  snakePath: Pos[];

  snakeFat: number = 15;
  headColor: string | CanvasGradient | CanvasPattern = '#3a599a';
  bodyColors: Array<string> = ['#29b396', '#29c3a6', '#2cdabd', '#2debce', '#2effe1',
                               '#2debce', '#2cdabd', '#29c3a6' ];

  currentLength: number = 10;

  framesPerOneLengthItem = 7;

  constructor (field: SnakeGame, x: number, y: number) {
    super(field, x, y);
    this.snakePath = [];
  }

  increaseSnakeLength(onLength: number):void {
    this.currentLength += onLength;
    this.snakeFat = 14 + this.currentLength / 10;
  }

  draw () {


    const first = this.snakePath.length % this.framesPerOneLengthItem;
    let length =  (this.snakePath.length - first) / this.framesPerOneLengthItem;

    for (let i = first;
         i < this.snakePath.length;
         i += this.framesPerOneLengthItem) {
      const elp = this.snakePath[i];
      this.drawCircle(elp.x, elp.y, this.snakeFat, this.bodyColors[ length %  this.bodyColors.length ]);
      length--;
      this.strokeCircle(elp.x, elp.y, this.snakeFat, this.headColor);
    }

    const hp = this.p;
    this.drawCircle(hp.x, hp.y, this.snakeFat, this.headColor);

    const eyeRadius = this.snakeFat / 3;
    const backOffset = eyeRadius / 3;
    const eyeRadius1 = eyeRadius / 2;
    const angle = Math.PI / 7;

    const f = this.field.ctx;
    f.save();
    f.translate(hp.x, hp.y);
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

  }

  beforeTurn (): void {
  }

  turn (): void {
    this.snakePath.push( new Pos(this.p.x, this.p.y) );
    this.moveForwardSafe();

    if (this.snakePath.length > this.currentLength * this.framesPerOneLengthItem ) {
      this.snakePath = this.snakePath.slice(1, this.snakePath.length);
    }

  }

  afterTurn (): void {
  }


}

