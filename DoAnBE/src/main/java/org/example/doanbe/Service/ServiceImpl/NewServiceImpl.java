package org.example.doanbe.Service.ServiceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.doanbe.DTO.NewDTO;
import org.example.doanbe.Entities.News;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.NewRepository;
import org.example.doanbe.Service.ServiceInterface.NewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
public class NewServiceImpl implements NewService {
    @Autowired
    private NewRepository newRepository;

    @Override
    public News addNew(News news) {
       return newRepository.save(news);
    }

    @Override
    public News updateNewById(
            int id,
            String news,
            MultipartFile file) throws IOException {
        News newss = newRepository.findById(id).orElseThrow(()->new MyException("Khong ton tai tin tuc nay"));

        // Parse newsDTO từ JSON
        ObjectMapper objectMapper = new ObjectMapper();
        NewDTO newsDTO = objectMapper.readValue(news, NewDTO.class);

        // Nếu user upload ảnh mới
        if (file != null && !file.isEmpty()) {
            // Xóa ảnh cũ
            String oldImagePath = newss.getThumbnail();
            if (oldImagePath != null && !oldImagePath.isEmpty()) {
                String uploadPath = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "news";
                String oldFileName = Paths.get(oldImagePath).getFileName().toString();
                File oldFile = new File(uploadPath + File.separator + oldFileName);
                if (oldFile.exists()) {
                    oldFile.delete();
                }
            }

            // Upload ảnh mới
            String uploadPath = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "news";
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            String extension = "";
            String originalFilename = file.getOriginalFilename();
            if (originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String newFilename = UUID.randomUUID() + "_" +
                    LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + extension;

            String newFilePath = uploadPath + File.separator + newFilename;
            file.transferTo(new File(newFilePath));

            // Cập nhật đường dẫn thumbnail mới
            newss.setThumbnail("/uploads/news/" + newFilename);
        }

        // Update các trường khác
        newss.setTitle(newsDTO.getTitle());
        newss.setContent(newsDTO.getContent());
        newss.setContent(newsDTO.getContent());
        newss.setStatus(newsDTO.getStatus());
        // ... các trường khác nếu có

        // Save lại
       return newRepository.save(newss);


    }

    @Override
    public List<News> getAllNews() {
        return newRepository.findAll();
    }

    @Override
    public News getNewsById(int id) {
        return newRepository.findById(id).orElseThrow(()->new MyException("Không thay bai viet nao"));
    }

    @Override
    public void deleteById(int id) {
        News news=newRepository.findById(id).orElseThrow(()->new MyException("Khong ton tai tin tuc nay"));
        if(news!=null){
            newRepository.deleteById(id);
        }
    }

    @Override
    public void updateStatus(int id) {
        News news=newRepository.findById(id).orElseThrow(()->new MyException("Khong ton tai tin tuc nay"));
        if(news.getStatus()){
            news.setStatus(false);
        }else {
            news.setStatus(true);
        }
        newRepository.save(news);
    }
}
