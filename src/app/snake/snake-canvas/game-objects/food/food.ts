import {SnakeGame} from '../snake-game';
import {TimeCounter} from '../../../../game-core/time-counter';
import {Snake} from '../snake';
import {CachedFilmGameObject, FilmFrameDescription} from '../../../../game-core/cached-film-game-object';
import {Pos} from '../../../../game-core/position';

export class Food extends CachedFilmGameObject<FoodState> {
  private static sizeKoef = 3;
  private static incKoef = 1.1; // it have to be > 1 !!!!!

  public isDrawable: boolean = true;
  public field: SnakeGame;

  private _size: number = 5;
  private eatPerTern = 1;

  private sizeForDraw: number;
  private color: Array<string>;

  private maxAdd  = 0;
  private addSize = 0;
  private incSize = +1;

  private timeCounter = new TimeCounter(100);

  public active: boolean = false;

  constructor (field: SnakeGame, x: number, y: number, size: number, color:  Array<string>) {
    super(field, x, y);
    this.color = color;
    this.size = size;
  }


  getCurrentFilmFrameDescription(): FilmFrameDescription<FoodState> {
    const state = new FoodState(
      this.sizeForDraw + this.addSize,
      this.color[this._size % this.color.length]
    );

    const sz = Math.floor( state.radius * 2 + 1);

    return new FilmFrameDescription<FoodState>(state.getKey(),
        new Pos(sz, sz ),
        new Pos(state.radius, state.radius),
        state
      );
  }

  drawFrame(frameCtx: CanvasRenderingContext2D, frameDescr: FilmFrameDescription<FoodState>) {

    const f_radius = frameDescr.details.radius;
    const f_color = frameDescr.details.color;

    const radialGradient  = frameCtx.createRadialGradient(
      frameDescr.center.x, frameDescr.center.y, Math.floor(f_radius / 3),
      frameDescr.center.x, frameDescr.center.y, f_radius
    );
    radialGradient.addColorStop(0, f_color );
    radialGradient.addColorStop(1, 'transparent');

    frameCtx.beginPath();
    frameCtx.fillStyle = radialGradient;
    frameCtx.arc(frameDescr.center.x, frameDescr.center.y, f_radius, 0, Math.PI * 2);
    frameCtx.fill();
  }


  beforeTurn (): void {
    if (this._size <= 0) { return; }

    if (this.timeCounter.isItTime()) {
      this.timeCounter.fixLastChecking();
      this.addSize += this.incSize;
      if ( Math.abs(this.addSize) > this.maxAdd) {
        this.incSize = (-1) * this.incSize;
        this.addSize += this.incSize;
      }

    }
  }

  turn (): void {}

  afterTurn (): void {
    if (this._size <= 0) { return; }

    const snakesTouched: Snake[] = this.field.snakes.filter( snake => this.isInZone(snake) );

    this.active = snakesTouched.length > 0;


    if (this.active) {

      let s = this.size;

      snakesTouched.forEach( snake => {
        if (s > 0) {
          snake.increaseSnakeLength(this.eatPerTern);
          s -= this.eatPerTern;
        }
      });

      if (s > 0) {
        this.size = s;
      } else {
        this.size = 0;
        this.isDrawable = false;
        this.field.markForDelete(this);
      }

    }

  }

  isInZone(snake: Snake): boolean {
    const distance = this.p.distanceTo( snake.p );
    return distance < ( this.sizeForDraw + this.addSize + snake.snakeFat );
  }

  get size (): number {
    return this._size;
  }

  set size (value: number) {
    this._size = value;
    this.sizeForDraw = Math.round(this._size * Food.sizeKoef);
    this.maxAdd = Math.round(this.sizeForDraw * Food.incKoef) - this.sizeForDraw;
  }

}

class FoodState {

  private _radius: number;
  private _color: string;


  get radius(): number {
    return this._radius;
  }

  get color(): string {
    return this._color;
  }


  constructor(radius: number, color: string) {
    this._radius = radius;
    this._color = color;
  }

  getKey(): string {
    return this._color + '-' + this._radius;
  }

}
