import {GameObject} from "./game-object";
import {Position} from "./position";
export class GameField {

  public ctx: CanvasRenderingContext2D;
  public gameObjects: GameObject[] = [];
  public size: Position = new Position(0,0);


  constructor (ctx: CanvasRenderingContext2D, xSize: number, ySize: number) {
    this.ctx = ctx;
    this.size.x = xSize;
    this.size.y = ySize;
  }

  public gameActionTurn(): void {
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.beforeTurn() );
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.turn() );
    this.gameObjects.forEach( (gameObject: GameObject) => gameObject.afterTurn() );
  }

  public gameFrameDraw(): void {

    this.gameObjects.forEach( (gameObject: GameObject) => {
      if (gameObject.isDrawable) gameObject.draw()
    });
  }

  public add(...gameObject: GameObject[]):void {
    this.gameObjects.push( ...gameObject );
  }

}
