package org.example.doanbe.Service.ServiceInterface;

import org.example.doanbe.DTO.CategoryDTO;
import org.example.doanbe.DTO.Response.CategoryDTOResponse;
import org.example.doanbe.Entities.Category;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {
    //Get danh muc (id,name)
    List<CategoryDTOResponse> getCategoryName();
    //Get category and product
    List<Category> getAllCategoryAndProduct();
    //Get detail 1 category
    Category getCategoryById(int id);

    //Add new Category
    Category addCategory(String categories, MultipartFile images) throws IOException;
    //Update Category by id
    Category updateCategory(int id,String categories, MultipartFile images) throws IOException;
    //Delete category
    void deleteCategoryById(int id);

    //Update status category
    void updateStatusCategory(int id);
    //Get by name
    Category getCategoryByName(String name);
}
