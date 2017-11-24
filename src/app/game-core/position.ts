export class Pos {

  public x = 0;
  public y = 0;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public distanceTo(p: Pos): number {
    const dx = p.x - this.x;
    const dy = p.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public equals(p: Pos): boolean {
    return this.x === p.x && this.y === p.y;

  }

}
