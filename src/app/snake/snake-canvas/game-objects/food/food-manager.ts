import {SnakeGame} from "../snake-game";
import {ManagerGameObject} from "../../../../game-core/manager-game-object";
import {Food} from "./food";
import {TimeCounter} from "../time-counter";


export class FoodManager extends ManagerGameObject {

  timeCounter: TimeCounter = new TimeCounter(2000); // for every 3 sec
  public field: SnakeGame;

  constructor (field: SnakeGame) {
    super(field);
  }


  beforeTurn (): void {
    if (this.timeCounter.isItTime()) {
      this.timeCounter.fixLastChecking();
      if (this.field.foods.length <= 300) this.makeFood();
    }
  }

  makeFood(): void {
    const food = new Food(
      this.field,
      Math.round(Math.random() * (this.field.size.x - 20)) + 10,
      Math.round(Math.random() * (this.field.size.y - 20)) + 10,
      Math.round(Math.random() * 2) + 1,
      '#38ff6c',
      '#ff9575'
    );

    this.field.add(food);

  }



}
