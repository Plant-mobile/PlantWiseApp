import { Controller,Get ,Post,Body} from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";

type ProductType={id:number,title:string}
@Controller()
export class ProductsController{
private products:ProductType[]=[{id:5,title:"samer"}]
@Post("/api/app")    
public creatnewprogect(@Body() body:CreateProductDto){
    console.log(body);
    return body;
    
}    
@Get("/api/app")    
public getAllProducts(){
return this.products;
}

}