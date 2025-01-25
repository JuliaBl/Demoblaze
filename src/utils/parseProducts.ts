import { IProduct } from "../model/IProduct";
import { ProductCategory } from "../model/ProductCategory";
import jsonData from './products.json' assert { type: "json" };;

export function getProductsByCategory(category: ProductCategory): IProduct[] {
    try {
      const data = JSON.parse(JSON.stringify(jsonData.products));
  
      if (!data[category]) {
        throw new Error(`Category '${category}' not found in the JSON data.`);
      }
  
      const products = data[category];
      if (!Array.isArray(products)) {
        throw new Error(`Invalid JSON format: '${category}' should be an array.`);
      }
  
      return products.map((product: IProduct) => {
        if (typeof product.name !== "string" || typeof product.price !== "string") {
          throw new Error(`Invalid product format in category '${category}': 'name' and 'price' should be strings.`);
        }
  
        return {
          name: product.name,
          price: product.price,
        };
      });
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
      throw error;
    }
  }
