import {GameField} from "../game-field";
import {ManagerGameObject} from "../manager-game-object";
import {Food} from "./food";
import {TimeCounter} from "../time-counter";


export class FoodManager extends ManagerGameObject {

  foodCount: number = 0;

  timeCounter: TimeCounter = new TimeCounter(3000); // for every 3 sec

  constructor (field: GameField) {
    super(field);
  }


  beforeTurn (): void {
    if (this.timeCounter.isItTime()) {
      this.timeCounter.fixLastChecking();
      if (this.foodCount <= 3) this.makeFood();
    }
  }

  makeFood(): void {

    const food = new Food(
      this.field,
      Math.round(Math.random() * (this.field.size.x - 20)) + 10,
      Math.round(Math.random() * (this.field.size.y - 20)) + 10,
      Math.round(Math.random() * 8) + 5,
      '#c277ff'
    );

    this.field.add(food);

    this.foodCount++;

  }

  foodWasRemoved(): void {
    this.foodCount--;
  }


}
