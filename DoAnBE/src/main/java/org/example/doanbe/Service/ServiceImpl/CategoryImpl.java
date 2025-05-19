package org.example.doanbe.Service.ServiceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.doanbe.APIResponse.ApiResponse;
import org.example.doanbe.DTO.CategoryDTO;
import org.example.doanbe.DTO.NewDTO;
import org.example.doanbe.DTO.Response.CategoryDTOResponse;
import org.example.doanbe.Entities.Category;
import org.example.doanbe.Entities.News;
import org.example.doanbe.Entities.Product;
import org.example.doanbe.Entities.Users;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.CategoryRepository;
import org.example.doanbe.Service.ServiceInterface.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<CategoryDTOResponse> getCategoryName() {
        return categoryRepository.getCategoryName();
    }

    @Override
    public void updateStatusCategory(int id) {
        Optional<Category> category=categoryRepository.findById(id);
        if(category.isPresent()){
            Category category1=category.get();
            if(category1.getStatus()){
                category1.setStatus(false);
            }else{
                category1.setStatus(true);
            }
            categoryRepository.save(category1);
        }else{
            throw new MyException("Danh mục không tồn tại");
        }
    }

    @Override
    public List<Category> getAllCategoryAndProduct() {
        List<Category> categories= categoryRepository.findAll();

        return categories;
    }

    @Override
    public Category getCategoryById(int id) {
        return categoryRepository.findById(id).orElseThrow(()->new MyException("Not found category"));
    }

    @Override
    public Category getCategoryByName(String name) {
        Category category= categoryRepository.findByNameEqualsIgnoreCase(name);
        if(category==null){
            throw new MyException("Không tìm thấy danh mục này");
        }
        return category;
    }

    @Override
    public Category addCategory(String categories, MultipartFile images) throws IOException {
        ObjectMapper objectMapper=new ObjectMapper();
        CategoryDTO categoryDTO=null;
        categoryDTO = objectMapper.readValue(categories, CategoryDTO.class);

        Category category=categoryRepository.findByNameEqualsIgnoreCase(categoryDTO.getName());
        String uploadPath = System.getProperty("user.dir") + File.separator + "uploads"+File.separator + "category";
        // Tạo thư mục nếu chưa có
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        // Lấy đuôi file
        String extension = "";
        String originalFilename = images.getOriginalFilename();
        if (originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // Tạo tên file duy nhất
        String filename = UUID.randomUUID() + "_" +
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + extension;

        String filePath = uploadPath + File.separator + filename;

        // Lưu ảnh
        images.transferTo(new File(filePath));

        if(category==null){
            category=new Category();
            category.setName(categoryDTO.getName());
            category.setDescription(categoryDTO.getDescription());
            category.setStatus(true);
            category.setParentId(categoryDTO.getParentId());
            category.setImages("/uploads/category/"+filename);
            return categoryRepository.save(category);
        }
        throw new MyException("Đã tồn tại danh mục này");
    }

//    @Override
//    public Category updateCategory(int id, CategoryDTO categoryDTO) {
//        Optional<Category> category=categoryRepository.findById(id);
//        if(category.isPresent()){
//            Category category1=category.get();
//            category1.setName(categoryDTO.getName());
//            category1.setDescription(categoryDTO.getDescription());
//            category1.setStatus(categoryDTO.getStatus());
//            return categoryRepository.save(category1);
//        }
//        throw new MyException("Chưa tồn tại danh mục này");
//    }

    @Override
    public Category updateCategory(int id, String categoryData, MultipartFile image) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryDTO categoryDTO = objectMapper.readValue(categoryData, CategoryDTO.class);

        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (!optionalCategory.isPresent()) {
            throw new MyException("Chưa tồn tại danh mục này");
        }

        Category category = optionalCategory.get();

        // Kiểm tra nếu người dùng đổi tên và tên đó đã tồn tại ở danh mục khác
//        Category existingCategory = categoryRepository.findByNameEqualsIgnoreCase(categoryDTO.getName());
//        if (existingCategory != null ) {
//            throw new MyException("Tên danh mục đã tồn tại");
//        }

        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setStatus(categoryDTO.getStatus());

        category.setParentId(categoryDTO.getParentId());

        // Nếu người dùng cập nhật ảnh mới
        if (image != null && !image.isEmpty()) {
            String uploadPath = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "category";
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String extension = "";
            String originalFilename = image.getOriginalFilename();
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String filename = UUID.randomUUID() + "_" +
                    LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + extension;

            String filePath = uploadPath + File.separator + filename;

            image.transferTo(new File(filePath));

            // Cập nhật đường dẫn ảnh mới
            category.setImages("/uploads/category/" + filename);
        }

        return categoryRepository.save(category);
    }


    @Override
    public void deleteCategoryById(int id) {
        Optional<Category> category=categoryRepository.findById(id);
        if(category.isPresent()){
            // Lấy đường dẫn ảnh của danh mục
            String imagePath = category.get().getImages();

            // Tạo đường dẫn tuyệt đối của ảnh
            if (imagePath != null && !imagePath.isEmpty()) {
                String uploadPath = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "category";
                // Tạo đường dẫn đầy đủ tới file ảnh
                String fileName = imagePath.replace("/uploads/category/", "");
                File file = new File(uploadPath + File.separator + fileName);
                System.out.println(file);
                // Nếu file tồn tại thì xóa
                if (file.exists()) {
                    boolean isDeleted = file.delete();
                    if (!isDeleted) {
                        throw new MyException("Không thể xóa ảnh của danh mục");
                    }
                }
            }

            categoryRepository.deleteById(id);
        }else{
            throw new MyException("Danh mục không tồn tại");
        }

    }
}
