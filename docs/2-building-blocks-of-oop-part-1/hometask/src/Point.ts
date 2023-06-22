export class Point {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
      this.x = x ?? 0
      this.y = y ?? 0
  }
   
  public toString = () : string => {
    return `(${this.x}, ${this.y})`;
  }
   
  distance()
  distance(point: Point)
  distance(x2: number, y2: number)
  distance(point1?: Point | number, point2?: number) : number {
    let calculatedPoint1
    let calculatedPoint2
    if (typeof point1 === 'number') {
      calculatedPoint1 = point1
      calculatedPoint2 = point2
    } else if (point1 instanceof Point) {
      calculatedPoint1 = point1.x
      calculatedPoint2 = point1.y
    } else {
      calculatedPoint1 = 0
      calculatedPoint2 = 0
    }

    let x = calculatedPoint1 - this.x;
    let y = calculatedPoint2 - this.y;

    return Math.sqrt(x * x + y * y);
  }
}