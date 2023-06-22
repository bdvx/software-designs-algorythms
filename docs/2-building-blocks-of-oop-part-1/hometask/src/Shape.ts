import { Point } from "./Point";
export abstract class Shape {
  protected color: string
  protected filled: boolean
  protected points: Point[]

  constructor(points: Point[], color?: string, filled?: boolean) {
    this.points = points
    this.color = color ?? 'green'
    this.filled = filled ?? true
    if(points.length < 3) throw new Error("Two or less point provided.");
}

  public toString() : string {
    return `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'not filled'}. Points: ${this.points.map(point => `(${point.x}, ${point.y})`).join(', ')}.`
  }

  public getPerimeter() : number {
    return this.points[0].distance(this.points[1]) + this.points[1].distance(this.points[2]) + this.points[2].distance(this.points[0])
  }


}
