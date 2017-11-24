import {SnakeGame} from './snake-game';
import {GameObject} from '../../../game-core/game-object';
import {Pos} from '../../../game-core/position';

export class Snake extends GameObject {
  static framesCache: any = { target: 'cache'};

  public isDrawable: boolean = true;

  tailCircles: number = 0;

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
    this.speed = 2;
    this.increaseSnakeLength(10);
  }

  increaseSnakeLength(onLength: number):void {
    this.currentLength += onLength;
    this.snakeFat = 14 + this.currentLength / 10;
    this.framesPerOneLengthItem = (this.snakeFat - (this.snakeFat % 4)) / 4;
  }

/*
  draw () {
    let lastIndex = this.snakePath.length - 1;
    if (lastIndex < 0) { return; }

    const ctx = this.field.ctx;

    ctx.lineWidth = this.snakeFat*2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.snakePath[lastIndex].x, this.snakePath[lastIndex].y);
    lastIndex -= this.framesPerOneLengthItem;

    for ( ; lastIndex >= this.framesPerOneLengthItem; lastIndex -= this.framesPerOneLengthItem ) {
      ctx.lineTo(this.snakePath[lastIndex].x, this.snakePath[lastIndex].y);
    }

    if (lastIndex > 0) {
      ctx.lineTo(this.snakePath[0].x, this.snakePath[0].y);
    }

    ctx.strokeStyle = '#fbffa4';
    ctx.stroke();

    const hp = this.p;
    this.fillCircle(hp.x, hp.y, this.snakeFat, this.headColor);

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
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    f.rotate(-2 * angle);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    f.restore();

  }
*/

/*
  draw () {
    const ctx = this.field.ctx;
    let circlesCount = 0;
    const first = this.snakePath.length % this.framesPerOneLengthItem;
    let length =  (this.snakePath.length - first) / this.framesPerOneLengthItem;

    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (first !== 0) {
      length++;
      const elp = this.snakePath[0];
      this.fcCircle(elp.x, elp.y, this.snakeFat, this.bodyColors[ (length + 30)  %  this.bodyColors.length ], this.bodyColors[ length %  this.bodyColors.length ]);
      circlesCount++;
      length--;
    }

    for (let i = first;
         i < this.snakePath.length;
         i += this.framesPerOneLengthItem) {
      const elp = this.snakePath[i];
      this.fcCircle(elp.x, elp.y, this.snakeFat, this.bodyColors[ (length + 30)  %  this.bodyColors.length ], this.bodyColors[ length %  this.bodyColors.length ]);
      circlesCount++;
      length--;
    }

    ctx.lineWidth = 1;

    const hp = this.p;
    this.fillCircle(hp.x, hp.y, this.snakeFat, this.headColor);

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
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    f.rotate(-2 * angle);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    f.restore();

    this.tailCircles = circlesCount;

  }
*/

  draw() {
    const ctx = this.field.ctx;
    let circlesCount = 0;
    const first = this.snakePath.length % this.framesPerOneLengthItem;
    let length =  (this.snakePath.length - first) / this.framesPerOneLengthItem;


    if (first !== 0) {
      length++;
      const elp = this.snakePath[0];
      this.drawFrame(elp, this.snakeFat, this.bodyColors[ (length + 30)  %  this.bodyColors.length ], this.bodyColors[ length %  this.bodyColors.length ]);
      circlesCount++;
      length--;
    }

    for (let i = first;
         i < this.snakePath.length;
         i += this.framesPerOneLengthItem) {
      const elp = this.snakePath[i];
      // this.fcCircle(elp.x, elp.y, this.snakeFat, this.bodyColors[ (length + 30)  %  this.bodyColors.length ], this.bodyColors[ length %  this.bodyColors.length ]);
      this.drawFrame(elp,         this.snakeFat, this.bodyColors[ (length + 30)  %  this.bodyColors.length ], this.bodyColors[ length %  this.bodyColors.length ]);
      circlesCount++;
      length--;
    }

    ctx.lineWidth = 1;

    const hp = this.p;
    this.fillCircle(hp.x, hp.y, this.snakeFat, this.headColor);

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
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    f.rotate(-2 * angle);
    this.fillCircle(eyeX, eyeY, eyeRadius, '#ffffff'); this.fillCircle(eyeX1, eyeY1, eyeRadius1, '#000000'); this.strokeCircle(eyeX, eyeY, eyeRadius, this.headColor);
    f.restore();

    this.tailCircles = circlesCount;

  }

  private drawFrame(p: Pos, radius: number, strokeStyle: string, fillStyle: string ): void {
    const image = this.getFrame(radius, strokeStyle, fillStyle);
    this.field.ctx.drawImage( image,
      p.x - image.width / 2,
      p.y - image.height / 2,
    );

  }

  private getFrame(radius: number, strokeStyle: string, fillStyle: string ): HTMLCanvasElement {
    const key = radius + '-' + strokeStyle + '-' + fillStyle;
    const lineWidth = 4;
    const lineWidth2 = 2;
    let actualFrame: HTMLCanvasElement;
    if (key in Snake.framesCache ) {
      actualFrame = Snake.framesCache[key];
    } else {

      const frameCanvas = <HTMLCanvasElement> document.createElement('canvas');
      frameCanvas.width = radius * 2 + lineWidth;
      frameCanvas.height = radius * 2 + lineWidth;
      const ctx: CanvasRenderingContext2D = frameCanvas.getContext('2d');
      ctx.beginPath();
      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.arc(radius + lineWidth2, radius + lineWidth2, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      actualFrame = frameCanvas;
      Snake.framesCache[key] = actualFrame;

    }

    return actualFrame;

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

