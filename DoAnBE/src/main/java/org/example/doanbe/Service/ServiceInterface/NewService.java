package org.example.doanbe.Service.ServiceInterface;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.doanbe.Entities.News;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface NewService {
    News addNew(News news);

    News updateNewById(int id, String news, MultipartFile file) throws IOException;
    List<News> getAllNews();
    void deleteById(int id);
    News getNewsById(int id);

    void updateStatus(int id);
}
