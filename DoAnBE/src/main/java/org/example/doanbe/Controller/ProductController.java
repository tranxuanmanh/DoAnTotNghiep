package org.example.doanbe.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.doanbe.APIResponse.ApiResponse;
import org.example.doanbe.DTO.ProductDTO;
import org.example.doanbe.DTO.ProductTop5;
import org.example.doanbe.DTO.RevenueByYearDTO;
import org.example.doanbe.Entities.Product;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Service.ServiceInterface.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/product")
@CrossOrigin(value = "*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("all")
    public ResponseEntity<ApiResponse<List<Product>>> getAllProduct(){
        return ResponseEntity.ok(new ApiResponse<>(200,"Get all product success",productService.getAllProduct()));

    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<Product> updateStatus(@PathVariable int id){
        Product product=productService.updateStatusById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<Product>>> getAllProductByPage(
            @RequestParam(value = "page",defaultValue = "0") int page,
            @RequestParam(value = "size",defaultValue = "30") int size,
            @RequestParam(value = "name",defaultValue = "createAt") String name,
            @RequestParam(value = "direction",defaultValue = "asc") String direction,
            @RequestParam(value = "status",defaultValue = "true") Boolean status
    ){
        Page<Product> products=productService.getAllProductByPage(page,size,name,direction,status);
        return ResponseEntity.ok(new ApiResponse<>(200,"Get all product success",products));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable int id){
        Product product= productService.findById(id);

        return ResponseEntity.ok(new ApiResponse<>(200,"Get all product success",product));

    }
    @GetMapping("/name")
    public ResponseEntity<ApiResponse<List<Product>>> getAllByName(@RequestParam(name="value") String value){
        return ResponseEntity.ok(new ApiResponse<>(200,"Get product by name success",productService.findAllByName(value)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable int id){
        productService.deleteProductById(id);
        return ResponseEntity.ok(new ApiResponse<>(200,"Xóa thành công","Xóa thành công sản phẩm: "+id));
    }

    //Add new product
    @PostMapping(consumes ={ MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addProduct(@RequestPart String productRequest,
                                        @RequestPart("images") List<MultipartFile> images){
        ObjectMapper objectMapper=new ObjectMapper();
        ProductDTO productDTO=null;
        try{
            productDTO = objectMapper.readValue(productRequest, ProductDTO.class);
            return ResponseEntity.ok(productService.saveProduct(productDTO, images));
        }catch (JsonProcessingException e){
            throw new MyException("Có lỗi khi thêm dữ liệu: "+e.getMessage());
        }
    }


    //Update Product
    @PutMapping(value = "/{id}",consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<ApiResponse<Product>> updateProduct(
            @PathVariable("id") int id,
            @RequestPart String productRequest,
            @RequestPart(value = "images", required = false) List<MultipartFile> images,
            @RequestParam(value = "removeImages", required = false) List<String> removeImages) throws IOException {

        ObjectMapper objectMapper=new ObjectMapper();
        ProductDTO productDTO =objectMapper.readValue(productRequest, ProductDTO.class);
        Product updatedProduct = productService.UpdateById(id, productDTO, images, removeImages);
        return ResponseEntity.ok(new ApiResponse<>(200,"Update thành công",updatedProduct));

    }
    //top 5 san pham ban chay
    @GetMapping("/top5")
    public ResponseEntity<List<ProductTop5>> getTopProduct(){
        return ResponseEntity.ok(productService.getTopProduct());
    }
    @GetMapping("filter/top5")
    public List<ProductTop5> getTop5Products(@RequestParam String filter) {
        return productService.getTopProductByFilter(filter);
    }

}
