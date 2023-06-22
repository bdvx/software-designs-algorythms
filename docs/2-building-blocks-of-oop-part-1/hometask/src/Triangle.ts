import { Shape } from "./Shape";
import { Point } from "./Point";
export class Triangle extends Shape {
    point1: Point
    point2: Point
    point3: Point

    constructor(point1: Point, point2: Point, point3: Point, color?: string, filled?: boolean) {
        // Invoking the constructor of the Shape class
        super([point1, point2, point3], color, filled);

        this.point1 = point1
        this.point2 = point2
        this.point3 = point3
    }
    public toString() : string {
        return `Triangle[v1=(${this.point1.x}, ${this.point1.y}),v2=(${this.point2.x}, ${this.point2.y}),v3=(${this.point3.x}, ${this.point3.y})]`
    }
    
    public getType() : string {
        const distance1 = this.point1.distance(this.point2).toFixed(1)
        const distance2 = this.point2.distance(this.point3).toFixed(1)
        const distance3 = this.point3.distance(this.point1).toFixed(1)
        console.log(distance1, distance2, distance3)
        if(distance1 === distance2 && distance2 === distance3){
            return 'equilateral triangle'
        } else if (distance1 === distance2 || distance2 === distance3 || distance1 === distance3) {
            return 'isosceles triangle'
        } else {
            return 'scalene triangle'
        }
    }
}