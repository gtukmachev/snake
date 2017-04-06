export class Position {

  public x: number = 0;
  public y: number = 0;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public distanceTo(p: Position): number {
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

}
