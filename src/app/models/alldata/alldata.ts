export class Alldata {
  constructor(
    public id?: number,
    public imagePath?: string,
    public productName?: string,
    public categoryName?: string,
    public isAvailable?: boolean,
    public quantity?: number,
    public unitPrice?: number,
    public storeDate?:Date
  ) { }
}
