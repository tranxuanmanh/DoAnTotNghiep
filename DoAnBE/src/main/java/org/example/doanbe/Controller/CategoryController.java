package org.example.doanbe.Controller;

import jakarta.validation.Valid;
import org.example.doanbe.APIResponse.ApiResponse;
import org.example.doanbe.DTO.CategoryDTO;
import org.example.doanbe.DTO.Response.CategoryDTOResponse;
import org.example.doanbe.Entities.Category;
import org.example.doanbe.Service.ServiceInterface.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    //Get name category
    @GetMapping("/gets")
    public ResponseEntity<ApiResponse<List<CategoryDTOResponse>>> getCategoryName(){
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Lấy dữ liệu thành công",categoryService.getCategoryName())) ;
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<ApiResponse<Category>> getCategoryByName(@PathVariable String name){
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Lấy dữ liệu thành công",categoryService.getCategoryByName(name)));
    }

    //Get category by id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Category>> getCategoryById(@PathVariable int id){
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Lấy dữ liệu thành công",categoryService.getCategoryById(id)));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Category>>> categories(){
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Lấy dữ liệu thành công",categoryService.getAllCategoryAndProduct()));
    }


    //Add new category
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Category>> addCategory(
            @RequestPart("category") String category,
            @RequestPart("images")MultipartFile images) throws IOException {
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Thêm dữ liệu mới thành công",categoryService.addCategory(category,images)));
    }
    //Update category by id
//    @PutMapping("/{id}")
//    public ResponseEntity<ApiResponse<Category>> addCategory(@PathVariable int id,@RequestBody CategoryDTO categorydto){
//        return ResponseEntity.ok().body(new ApiResponse<>(200,"Cập nhật dữ liệu thành công",categoryService.updateCategory(id,categorydto)));
//    }

    @PutMapping("/{id}")
   public ResponseEntity<ApiResponse<Category>> addCategory(
            @PathVariable int id,
            @RequestPart("categoryData") String categoryData,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Cập nhật dữ liệu thành công",categoryService.updateCategory(id,categoryData,image)));
    }


    @PutMapping("/status/{id}")
    public ResponseEntity<ApiResponse<Category>> updateStatusCategory(@PathVariable int id){
        categoryService.updateStatusCategory(id);
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Cập nhật trạng thái thành công",null));
    }

    //Delete category by id
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> addCategory(@PathVariable int id){
        categoryService.deleteCategoryById(id);
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Xóa thành công",null));
    }
}
