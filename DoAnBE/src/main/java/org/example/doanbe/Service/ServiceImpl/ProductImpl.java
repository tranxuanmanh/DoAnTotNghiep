package org.example.doanbe.Service.ServiceImpl;

import org.example.doanbe.DTO.ProductDTO;
import org.example.doanbe.DTO.ProductTop5;
import org.example.doanbe.DTO.SizeDTO;
import org.example.doanbe.Entities.*;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.CategoryRepository;
import org.example.doanbe.Repositories.ProductRepository;
import org.example.doanbe.Repositories.ToppingRepository;
import org.example.doanbe.Service.ImageService.ImageService;
import org.example.doanbe.Service.ServiceInterface.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.example.doanbe.DTO.SizeDTO;

@Service
public class ProductImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ToppingRepository toppingRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ImageService imageService;

    @Transactional
    @Override
    public Product saveProduct(ProductDTO productDTO, List<MultipartFile> imageFiles) {
        Product product = new Product();
        Double price= productDTO.getPrice();
        Double priceDiscount=productDTO.getPriceDiscount();
        Double giaGiam = price * priceDiscount / 100.0;
        Double priceSell=price-giaGiam;
        product.setName(productDTO.getName());
        product.setPrice(price);
        product.setPriceDiscount(priceDiscount);
        product.setPriceSell(priceSell);

        product.setDescription(productDTO.getDescription());
        product.setSold_quantity(0);//Mac dinh la 0
        product.setTag(productDTO.getTag());
        product.setStatus(true);//Mac dinh la true
        product.setQuantity(productDTO.getQuantity());
        //Set category
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(() -> new MyException("Not found category"));
        product.setCategory(category);

        //Set topping
        List<Topping> toppings = toppingRepository.findAllById(productDTO.getToppings());
        product.setToppings(toppings);

        //Set size


        //Set image
        // Chuyển đổi ImageDTO thành Image entity
        try {
            List<Map<String, Object>> images = imageService.uploadImages(imageFiles,"product");
            List<Image> imageLst = new ArrayList<>();
            for (Map<String, Object> item : images) {
                Image image = new Image();
                image.setImage_url((String) item.get("image_url"));
                image.setPublicId((String) item.get("public_id"));
                image.setProduct(product);
                imageLst.add(image);
            }
            product.setImages(imageLst);
        } catch (IOException ex) {
            throw new MyException("Co loi xay ra khi upload " + ex.getMessage());
        }

        return productRepository.save(product);
    }

    @Override
    @Transactional
    public Product UpdateById(int id,
                              ProductDTO productDTO,
                              List<MultipartFile> imageFiles,
                              List<String> ImagesRemove
    ) throws IOException {
        Product product = productRepository.findById(id).orElseThrow(() -> new MyException("Không tồn tại sản phẩm này"));

        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setPriceDiscount(productDTO.getPriceDiscount());

        product.setDescription(productDTO.getDescription());
        product.setTag(productDTO.getTag());
        product.setStatus(productDTO.getStatus());//Mac dinh la true
        //Set category
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(() -> new MyException("Not found category"));
        product.setCategory(category);
        //Set Topping
        // Lấy danh sách topping mới từ DTO
        List<Topping> updatedToppings = toppingRepository.findAllById(productDTO.getToppings());

        // Xóa topping không còn trong danh sách mới
        List<Topping> toppingsToRemove = product.getToppings().stream()
                .filter(existingTopping -> !updatedToppings.contains(existingTopping))
                .toList();

        product.getToppings().removeAll(toppingsToRemove); // Xóa khỏi danh sách của sản phẩm

        // Thêm các topping mới nếu có
        for (Topping topping : updatedToppings) {
            if (!product.getToppings().contains(topping)) {
                product.getToppings().add(topping);
            }
        }

        //Xóa anh
        if (ImagesRemove != null && !ImagesRemove.isEmpty()) {
            List<Image> images = product.getImages();
            List<Image> imagesToDelete = images.stream()
                    .filter(img -> ImagesRemove.contains(img.getPublicId()))
                    .toList();
            // xóa khỏi database
            imageService.deleteImageInDataBase(imagesToDelete);
            for (Image img : imagesToDelete) {
                imageService.deleteImage(img.getPublicId()); // gọi đến service xóa khỏi Cloud

            }

            // Cập nhật lại danh sách ảnh của sản phẩm
            images.removeAll(imagesToDelete);
        }

        // Thêm ảnh mới
        if (imageFiles != null && !imageFiles.isEmpty()) {
            try {
                List<Map<String, Object>> uploadedImages = imageService.uploadImages(imageFiles, "product");
                for (Map<String, Object> item : uploadedImages) {
                    Image image = new Image();
                    image.setImage_url((String) item.get("image_url"));
                    image.setPublicId((String) item.get("public_id"));
                    image.setProduct(product);
                    product.getImages().add(image);
                }
            } catch (IOException ex) {
                throw new MyException("Có lỗi xảy ra khi upload ảnh: " + ex.getMessage());
            }
        }


            return productRepository.save(product);
    }
    // Xóa Size không còn trong danh sách mới
// List<Size> sizesToRemove = existingSizes.stream()



    @Override
    public Product findById(int id) {
        return productRepository.findById(id).orElseThrow(()->new MyException("Không tìm thấy sản phẩm nào"));
    }
    //Lấy tất cả sản phẩm theo Page
    @Override
    public Page<Product> getAllProductByPage(int page,int size,String sortBy,String direction,Boolean status) {
        Sort sort=direction.equalsIgnoreCase("asc")?Sort.by(sortBy).ascending():Sort.by(sortBy).descending();
        Pageable pageable= PageRequest.of(page,size,sort);
       // Page<Product> productPage= productRepository.findAll(pageable);
        Page<Product> productPage= productRepository.findAllByStatus(status,pageable);
        if(productPage.isEmpty()){
            throw new MyException("Khong tim thay san pham nao");
        }
        return productPage;
    }

    @Override
    public void deleteProductById(int id) {
        Product product=findById(id);
        if(product!=null){
            productRepository.deleteById(id);
        }

    }
    //Dùng để search
    @Override
    public List<Product> findAllByName(String name) {
        List<Product> products= productRepository.findAllByNameLike(name);
        if(products.isEmpty()){
            throw new MyException("Không tìm thấy sản phẩm nào");
        }
        return products;
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public List<ProductTop5> getTopProduct() {
        return productRepository.getTopProduct();
    }

    @Override
    public List<ProductTop5> getTopProductByFilter(String filter) {
        LocalDateTime start = null;
        LocalDateTime end = null;
        LocalDateTime now = LocalDateTime.now();

        switch (filter.toLowerCase()) {
            case "today":
                start = now.toLocalDate().atStartOfDay();
                end = now.toLocalDate().plusDays(1).atStartOfDay();
                break;
            case "yesterday":
                start = now.toLocalDate().minusDays(1).atStartOfDay();
                end = now.toLocalDate().atStartOfDay();
                break;
            case "this_month":
                start = now.withDayOfMonth(1).toLocalDate().atStartOfDay();
                end = start.plusMonths(1);
                break;
            case "last_month":
                start = now.minusMonths(1).withDayOfMonth(1).toLocalDate().atStartOfDay();
                end = start.plusMonths(1);
                break;
            case "this_year":
                start = now.withDayOfYear(1).toLocalDate().atStartOfDay();
                end = start.plusYears(1);
                break;
            case "last_year":
                start = now.minusYears(1).withDayOfYear(1).toLocalDate().atStartOfDay();
                end = start.plusYears(1);
                break;
            default:
                throw new IllegalArgumentException("Invalid filter type");
        }

        return productRepository.findTop5ByUpdatedAtBetween(start, end);
    }

    @Override
    public Product updateStatusById(int id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new MyException("Không tồn tại sản phẩm này"));
        if (product.getStatus()) {
            product.setStatus(false);
        } else {
            product.setStatus(true);
        }
        return productRepository.save(product);
    }
}
