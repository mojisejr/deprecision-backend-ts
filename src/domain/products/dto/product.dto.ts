import { DTO } from "../../../core/interfaces/base.dto";

export interface ProductDTO extends DTO {
  name?: string;
  brand?: string;
  type: string;
  category: string;
  model_no: string;
  size?: number[];
  details?: string;
  configurations?: string[];
  imageUrl?: string;
}
