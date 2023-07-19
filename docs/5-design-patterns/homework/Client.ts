import { Shipment } from "./Shipment";

export class Client {
    shipment: Shipment;

    constructor(shipment: Shipment) {
        this.shipment = shipment
        console.log(shipment.ship())
    }
    
  }

