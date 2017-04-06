import {GameField} from "../game-field";
import {ManagerGameObject} from "../manager-game-object";
import {Food} from "./food";


export class FoodManager extends ManagerGameObject {

  foodCount: number = 0;

  lastMsAdded: number = 0;

  constructor (field: GameField) {
    super(field);
  }


  beforeTurn (): void {
    const ms = new Date().getTime();
    if ((this.lastMsAdded + 3000) < ms ) {
      if (this.foodCount <= 3) {
        this.makeFood();
        this.lastMsAdded = ms;
      }
    }
  }

  makeFood(): void {

    const food = new Food(
      this.field,
      Math.round(Math.random() * (this.field.size.x - 20)) + 10,
      Math.round(Math.random() * (this.field.size.y - 20)) + 10,
      Math.round(Math.random() * 10) + 10,
      '#c277ff'
    );

    this.field.add(food);

    this.foodCount++;

  }

  foodWasRemoved(): void {
    this.foodCount--;
  }


}
