import { ProductRepository } from "../domain/products/repository/product.repository";
import { APIFeature } from "./../core/api.feature";

// interface MongooseModel {
//   find(queryString?: string): this;
//   sort(queryString?: string): this;
//   // limitFields(fields: string[]): this;
//   skip(skipNum: number): this;
//   limit(limitNum: number): this;
// }

// export class MongooseAPIFeature<T extends MongooseModel> {
export class MongooseAPIFeature extends APIFeature {
  constructor(inputModel: any, inputQueryString: any) {
    super(inputModel, inputQueryString);
    // this.model = inputmodel;
    // this.queryString = inputQueryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach(
      (excludedField) => delete queryObject[excludedField]
    );
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|le)\b/g,
      (match) => `$${match}`
    );

    this.model = this.model.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.model = this.model.sort(sortBy);
    } else {
      //defaults
      this.model = this.model.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.model = this.model.select(fields);
    } else {
      this.model = this.model.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    this.model = this.model.skip(skip).limit(limit);
    return this;
  }
}
