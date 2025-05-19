package org.example.doanbe.Service.ServiceImpl;

import org.example.doanbe.DTO.ReviewDTO;
import org.example.doanbe.Entities.Order_Item;
import org.example.doanbe.Entities.Product;
import org.example.doanbe.Entities.Reviews;
import org.example.doanbe.Entities.Users;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.ReviewRepository;
import org.example.doanbe.Repositories.UserRepository;
import org.example.doanbe.Service.ServiceInterface.ReviewService;
import org.example.doanbe.TestRepository.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private OrderItemsRepository orderItemRepo;
    @Autowired
    private UserRepository userRepository;

    public Reviews addReview(ReviewDTO req){
        Order_Item item = orderItemRepo.findById(req.getOrderItemId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm trong đơn hàng"));

        Product product = item.getProduct();
        if (!(product.getProduct_id()==req.getProductId())) {
            throw new RuntimeException("Sai thông tin sản phẩm");
        }
        Users users=userRepository.findById(req.getUserId()).orElseThrow(()->new MyException("Khong ton tai user nay"));
        // 5. Tạo Review mới
       boolean exitByUserId= reviewRepository.existsByUserId(users.getUserId());
       boolean exitByOrder=reviewRepository.existsByOrderItem(item);
       boolean exitByProduct=reviewRepository.existsByProductId(product.getProduct_id());
       if(exitByProduct&&exitByOrder&&exitByUserId)
       {
           throw new MyException("Bạn đã đánh giá san pham nay roi");
       }

        Reviews review = new Reviews();
        review.setOrderItem(item);
        review.setProductId(product.getProduct_id());
        review.setUserId(users.getUserId());
        review.setRating(req.getRating());
        review.setComment(req.getComment());
        review.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    @Override
    public List<Reviews> findByProductId(int id) {
        List<Reviews> reviews=reviewRepository.findByProductId(id);
        if(reviews.isEmpty()){
            return null;
        }
        return reviews;
    }
}

