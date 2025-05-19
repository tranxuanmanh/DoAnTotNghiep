package org.example.doanbe.Service.ServiceInterface;

import org.example.doanbe.DTO.ProductDTO;
import org.example.doanbe.DTO.ProductTop5;
import org.example.doanbe.Entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    List<Product> getAllProduct();
    //Save product
    Product saveProduct(ProductDTO productDTO,List<MultipartFile> imageFiles);
    Product findById(int id);

    Product updateStatusById(int id);


    Page<Product> getAllProductByPage(int page,int size,String sortBy,String direction,Boolean status);
    void deleteProductById(int id);

    List<Product> findAllByName(String name);

    Product UpdateById(int id,ProductDTO productDTO ,List<MultipartFile> imageFiles, List<String> ImagesRemove) throws IOException;

    //Thống ke
    List<ProductTop5> getTopProduct();

    //Thong ke day du
    List<ProductTop5> getTopProductByFilter(String filter);




}
