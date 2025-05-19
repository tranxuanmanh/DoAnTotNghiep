package org.example.doanbe.Service.ImageService;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import org.apache.tomcat.util.http.fileupload.impl.IOFileUploadException;
import org.example.doanbe.Config.CloudinaryConfig;
import org.example.doanbe.Entities.Image;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ImageService {
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private ImageRepository imageRepository;
    private Map<String, Object> getUploadParams(String folder) {
        return ObjectUtils.asMap(
                "resource_type", "image",
                "folder", folder,
                "quality", "auto:good",
                "format", "jpg",
                "width", 800,
                "crop", "limit"
        );
    }
    //Upload 1 image
    public Map<String, Object> uploadImage(MultipartFile file,String folder) throws IOException {

        Map<String,Object> uploadResult= cloudinary.uploader().upload(file.getBytes(),getUploadParams(folder));
        Map<String, Object> response = new HashMap<>();
        response.put("image_url", uploadResult.get("secure_url"));
        response.put("public_id", uploadResult.get("public_id"));
        return response;
    }
    //Upload nhieu image
    public List<Map<String,Object>> uploadImages(List<MultipartFile> files,String folder) throws IOException{
        List<Map<String,Object>> uploadImages=new ArrayList<>();
        for(MultipartFile file:files){
            Map<String,Object> uploadFile=uploadImage(file,folder);
            uploadImages.add(uploadFile);
        }
        return uploadImages;

    }
    //Lay cac hinh anh theo public_id
    public List<Image> getAllImage(List<String> publicIds){
        return imageRepository.findByPublicIdIn(publicIds);
    }
    //Kiểm tra 1 ảnh tồn tại ko
    public boolean isImageExists(String publicId) {
        try {
            ApiResponse result = cloudinary.api().resource(publicId, ObjectUtils.emptyMap());
            return result != null; // Nếu có dữ liệu trả về nghĩa là ảnh tồn tại
        } catch (Exception e) {
            return false; // Nếu có lỗi, có thể là do ảnh không tồn tại
        }
    }
    //Xóa 1 ảnh
    private Map<String, Object> getDestroyParams() {
        return ObjectUtils.asMap(
                "resource_type", "image"
        );
    }
    public String deleteImage(String publicId) throws IOException {
        if(!isImageExists(publicId)){
            throw new MyException("Ảnh không tồn tại");
        }
            Map<String, Object> removeImage = cloudinary.uploader().destroy(publicId, getDestroyParams());
            return removeImage.get("result").toString();//Trả về OK là được
    }
    //Xóa nhiều ảnh

    public List<String> deleteImages(List<String> publicIds) {
        try {
            List<String> kq = new ArrayList<>();
            for (String publicId : publicIds) {
                kq.add(deleteImage(publicId));
            }
            return kq;
        }catch (IOException ex){
            throw new MyException("file không tồn tại "+ex.getMessage());
        }
    }

    public void deleteImageInDataBase(List<Image> images){
        imageRepository.deleteAll(images);
    }

}
