export abstract class APIFeature {
  protected model: any;
  protected queryString: any;
  constructor(inputmodel: any, inputQueryString: any) {
    this.model = inputmodel;
    this.queryString = inputQueryString;
  }

  get query() {
    return this.model;
  }
  abstract filter(): this;
  abstract sort(): this;
  abstract limitFields(): this;
  abstract paginate(): this;
}
