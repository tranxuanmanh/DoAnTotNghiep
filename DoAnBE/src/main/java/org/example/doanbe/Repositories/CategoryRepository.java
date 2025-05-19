package org.example.doanbe.Repositories;

import org.example.doanbe.DTO.CategoryDTO;
import org.example.doanbe.DTO.Response.CategoryDTOResponse;
import org.example.doanbe.Entities.Category;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {
    Category findByNameEqualsIgnoreCase(String name);
    @Query(value="select category_id ,name,description,status,images from categories u",nativeQuery = true)
    List<CategoryDTOResponse> getCategoryName();

    Category findByNameContaining(String name);
}
