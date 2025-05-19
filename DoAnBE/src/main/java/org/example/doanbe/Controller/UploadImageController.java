package org.example.doanbe.Controller;

import org.example.doanbe.APIResponse.ApiResponse;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Service.ImageService.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequestMapping("api/v1/image")
@RestController
public class UploadImageController {
    @Autowired
    private ImageService imageService;
    @PostMapping("/upload")
    public List<Map<String, Object>> uploadImage(@RequestParam(name = "files") List<MultipartFile> files,
                                                 @RequestParam(name = "folder") String folder){
        try{
            return imageService.uploadImages(files,folder);
        }catch (IOException ex){
            throw new MyException("Co loi xay ra khi upload image : "+ex.getMessage());
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<?>> deleteByPublicId(@RequestParam("ids") List<String> publicIds)  {
            return ResponseEntity.ok(new ApiResponse<>(200,"Xóa thành cong",imageService.deleteImages(publicIds)));

    }
}
