import {SnakeGame} from './snake-game';
import {GameObject} from '../../../game-core/game-object';
import {Pos} from '../../../game-core/position';

export class Snake extends GameObject {
  public isDrawable: boolean = true;

  snakePath: Pos[];

  snakeFat: number = 15;
  headColor: string | CanvasGradient | CanvasPattern = '#3a599a';
  bodyColors: Array<string> = [
    '#248f75' ,
    '#259378' ,
    '#26977b' ,
    '#279b7e' ,
    '#289f81' ,
    '#29a283' ,
    '#2aa686' ,
    '#2ba988' ,
    '#2daf8d' ,
    '#2eb390' ,
    '#2fb894' ,
    '#30bd98' ,
    '#31bf9a' ,
    '#32c39d' ,
    '#33c7a0' ,
    '#34cba3' ,
    '#35cfa6' ,
    '#36d3a9' ,
    '#37d8ad' ,
    '#38dbaf' ,
    '#39deb1' ,
    '#3ae2b4' ,
    '#3be5b6' ,
    '#3ce8b8' ,
    '#3decbb' ,
    '#3eefbd' ,
    '#3ff4c1' ,
    '#40f9c5' ,
    '#41fec9' ,
    '#41ffca' ,
    '#41fec9' ,
    '#40f9c5' ,
    '#3ff4c1' ,
    '#3eefbd' ,
    '#3decbb' ,
    '#3ce8b8' ,
    '#3be5b6' ,
    '#3ae2b4' ,
    '#38dbaf' ,
    '#39deb1' ,
    '#37d8ad' ,
    '#36d3a9' ,
    '#35cfa6' ,
    '#34cba3' ,
    '#33c7a0' ,
    '#32c39d' ,
    '#31bf9a' ,
    '#30bd98' ,
    '#2fb894' ,
    '#2eb390' ,
    '#2daf8d' ,
    '#2ba988' ,
    '#2aa686' ,
    '#29a283' ,
    '#289f81' ,
    '#279b7e' ,
    '#26977b' ,
    '#259378' ,
  ];

  currentLength = 0;
  framesPerOneLengthItem = 5;

  constructor (field: SnakeGame, x: number, y: number) {
    super(field, x, y);
    this.snakePath = [];
    this.increaseSnakeLength(10);
  }

  increaseSnakeLength(onLength: number):void {
    this.currentLength += onLength;
    this.snakeFat = 14 + this.currentLength / 10;
    this.framesPerOneLengthItem = (this.snakeFat - (this.snakeFat % 3)) / 3;
  }

  draw () {


    const first = this.snakePath.length % this.framesPerOneLengthItem;
    let length =  (this.snakePath.length - first) / this.framesPerOneLengthItem;

    if (first !== 0) {
      length++;
      const elp = this.snakePath[0];
      this.drawCircle(elp.x, elp.y, this.snakeFat, this.bodyColors[ length %  this.bodyColors.length ]);
      length--;
      this.strokeCircle(elp.x, elp.y, this.snakeFat, this.bodyColors[ (length + 30)  %  this.bodyColors.length ]);
    }

    for (let i = first;
         i < this.snakePath.length;
         i += this.framesPerOneLengthItem) {
      const elp = this.snakePath[i];
      this.drawCircle(elp.x, elp.y, this.snakeFat, this.bodyColors[ length %  this.bodyColors.length ]);
      length--;
      this.strokeCircle(elp.x, elp.y, this.snakeFat,  this.bodyColors[ (length + 30)  %  this.bodyColors.length ]);
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

