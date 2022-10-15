export class Product {
  constructor(
    public id?: number,
    public productName?: string,
    public categoryId?: number,
    public quantity?: number,
    public unitPrice?: number,
    public storeDate?: Date,
    public isAvailable?:boolean
  ) { }
}
