export class Shipment {
    ShipmentID: number;
    Weight: number;
    FromAddress: string
    FromZipCode: string
    ToAddress: string
    ToZipCode: string

    static globalShipmentIdCount:number = 0
    static readonly GLOBAL_RATE:number = 39

    constructor(ShipmentID: number,
        Weight: number,
        FromAddress: string,
        FromZipCode: string,
        ToAddress: string,
        ToZipCode: string) {

        this.ShipmentID = ShipmentID
        this.Weight = Weight
        this.FromAddress = FromAddress
        this.ToAddress = ToAddress
        this.FromZipCode = FromZipCode
        this.ToZipCode = ToZipCode

    }
     
    getShipmentID(): number {
      Shipment.globalShipmentIdCount += 1;
      return Shipment.globalShipmentIdCount;
    }
     
    getInstance(): void {
    }
     
    ship(): string {
      return `Shipment ID is: ${this.ShipmentID}, the item was sent from ${this.FromAddress}, ${this.FromZipCode}, it is going to ${this.ToAddress}, ${this.ToZipCode}, the cost is ${this.Weight * Shipment.GLOBAL_RATE}`
    }
  }
