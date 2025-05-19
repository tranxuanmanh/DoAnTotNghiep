package org.example.doanbe.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Value;
import org.example.doanbe.APIResponse.ApiResponse;
import org.example.doanbe.DTO.NewDTO;
import org.example.doanbe.DTO.ProductDTO;
import org.example.doanbe.DTO.TacGiaBaiVietDTO;
import org.example.doanbe.Entities.News;
import org.example.doanbe.Entities.Users;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Service.ServiceInterface.NewService;
import org.example.doanbe.TestService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/news")
public class NewsController {
    @Autowired
    private NewService newService;
    @Autowired
    private UserService userService;

    //Thêm tin tuc moi
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<News>> addNews(
            @RequestPart("news")  String news,
            @RequestPart("file") MultipartFile file
    ) throws IOException {
        String uploadPath = System.getProperty("user.dir") + File.separator + "uploads"+File.separator + "news";
            // Tạo thư mục nếu chưa có
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Lấy đuôi file
            String extension = "";
            String originalFilename = file.getOriginalFilename();
            if (originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            // Tạo tên file duy nhất
            String filename = UUID.randomUUID() + "_" +
                    LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + extension;
            String filePath = uploadPath + File.separator + filename;

            // Lưu ảnh
           file.transferTo(new File(filePath));

        ObjectMapper objectMapper=new ObjectMapper();
        NewDTO newDTO=null;
        try{
            newDTO = objectMapper.readValue(news, NewDTO.class);
            News newss = new News();
            newss.setTitle(newDTO.getTitle());
            newss.setContent(newDTO.getContent());
            Users users=userService.findById(newDTO.getUserId());
            newss.setUser_id(users.getUserId());
            newss.setStatus(true);
            newss.setThumbnail("/uploads/news/" + filename);

            // Gọi service để lưu DB
            News saved = newService.addNew(newss);
            return ResponseEntity.ok(new ApiResponse<>(200,"Add success",saved));
        }catch (JsonProcessingException e){
            throw new MyException("Có lỗi khi thêm dữ liệu: "+e.getMessage());
        }

            // Gán dữ liệu cho entit
    }

    //Lay tat ca tin tuc
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<?>>> getAllNews(){
        List<News> getAllNews=newService.getAllNews();

        List<TacGiaBaiVietDTO> tacGiaBaiVietDTOList = getAllNews.stream()
                .map(news -> {
                    TacGiaBaiVietDTO tacGiaBaiVietDTO = new TacGiaBaiVietDTO();
                    tacGiaBaiVietDTO.setId(news.getId());
                    tacGiaBaiVietDTO.setThumbnail(news.getThumbnail());
                    tacGiaBaiVietDTO.setTitle(news.getTitle());
                    tacGiaBaiVietDTO.setContent(news.getContent());
                    tacGiaBaiVietDTO.setStatus(news.getStatus());
                    Users users=userService.findById(news.getUser_id());
                    tacGiaBaiVietDTO.setUserName(users.getFullName());
                    tacGiaBaiVietDTO.setCreatedAt(news.getCreateAt());
                    tacGiaBaiVietDTO.setUpdatedAt(news.getUpdateAt());
                    return tacGiaBaiVietDTO;
                })
                .toList();

        return ResponseEntity.ok().body(new ApiResponse<>(200,"Get all success",tacGiaBaiVietDTOList));
    }

    //Chi tiet 1 tin tuc
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> findNewsById(@PathVariable int id){
        News getDetailNews=newService.getNewsById(id);
        TacGiaBaiVietDTO tacGiaBaiVietDTO = new TacGiaBaiVietDTO();
        tacGiaBaiVietDTO.setId(getDetailNews.getId());
        tacGiaBaiVietDTO.setThumbnail(getDetailNews.getThumbnail());
        tacGiaBaiVietDTO.setTitle(getDetailNews.getTitle());
        tacGiaBaiVietDTO.setContent(getDetailNews.getContent());
        tacGiaBaiVietDTO.setStatus(getDetailNews.getStatus());
        Users users=userService.findById(getDetailNews.getUser_id());
        tacGiaBaiVietDTO.setUserName(users.getFullName());
        tacGiaBaiVietDTO.setCreatedAt(getDetailNews.getCreateAt());
        tacGiaBaiVietDTO.setUpdatedAt(getDetailNews.getUpdateAt());
        // Chuyển đổi sang DTO
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Get news success",tacGiaBaiVietDTO));
    }

    //Cap nhat 1 tin tuc
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNewsById(
            @PathVariable int id,
            @RequestPart(value = "news",required = false) String news,
            @RequestPart(value = "file",required = false) MultipartFile file

    ) throws IOException {
        News news1=newService.updateNewById(id,news,file);
        return ResponseEntity.ok().body(new ApiResponse<>(200,"Update success",news1));
    }

    //Xoa 1 tin tuc
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNewById(@PathVariable int id){
        News news=newService.getNewsById(id);
        String imagePath = news.getThumbnail();

        // Tạo đường dẫn tuyệt đối của ảnh
        if (imagePath != null && !imagePath.isEmpty()) {
            String uploadPath = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "news";
            // Tạo đường dẫn đầy đủ tới file ảnh
            String fileName = Paths.get(imagePath).getFileName().toString();
            File file = new File(uploadPath + File.separator + fileName);

            System.out.println(file);
            // Nếu file tồn tại thì xóa
            if (file.exists()) {
                boolean isDeleted = file.delete();
                System.out.println(isDeleted);
                if (!isDeleted) {
                    throw new MyException("Không thể xóa ảnh của tin tức");
                }
            }
        }

        newService.deleteById(id);
        return ResponseEntity.ok(new ApiResponse<>(200,"Xoa tin tuc thanh cong","Xoa thanh cong"));
    }
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable int id){
        newService.updateStatus(id);
        return ResponseEntity.ok(new ApiResponse<>(200,"Update status success","Update status success"));
    }
}

