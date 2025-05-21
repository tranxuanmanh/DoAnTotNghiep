package org.example.doanbe.Service.ServiceImpl;

import org.example.doanbe.DTO.Response.ReviewResponse;
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
        review.setStatus(true);

        return reviewRepository.save(review);
    }

    @Override
    public List<ReviewResponse> findByProductId(int id) {
        List<Reviews> reviews=reviewRepository.findByProductId(id);
        if(reviews==null){
            throw new MyException("Sản phẩm nay chua co danh gia");
        }
        // Chuyển đổi danh sách Reviews thành danh sách ReviewResponse
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(review -> {
                    String userName= userRepository.findById(review.getUserId()).get().getFullName();
                  return new ReviewResponse(
                            review.getReviewId(),
                            review.getProductId(),
                            review.getUserId(),
                            userName,
                            review.getRating(),
                            review.getComment(),
                            review.getStatus(),
                            review.getCreatedAt()
                    );

                })
                .toList();
        if(reviews.isEmpty()){
            return null;
        }
        return reviewResponses;
    }


    //Lay tat ca review theo sao

    @Override
    public List<ReviewResponse> findAllByRating(int start) {
        List<Reviews> getAllByRating=reviewRepository.findAllByRating(start);
        if(getAllByRating==null){
            throw new MyException("Chua co danh gia nao");
        }
        // Chuyển đổi danh sách Reviews thành danh sách ReviewResponse
        List<ReviewResponse> reviewResponse = getAllByRating.stream()
                .map(review -> {
                    String userName= userRepository.findById(review.getUserId()).get().getFullName();
                    return new ReviewResponse(
                            review.getReviewId(),
                            review.getProductId(),
                            review.getUserId(),
                            userName,
                            review.getRating(),
                            review.getComment(),
                            review.getStatus(),
                            review.getCreatedAt()
                    );
                })
                .toList();
        return reviewResponse;
    }

    @Override
    public void updateStatus(int id) {
        Reviews reviews=reviewRepository.findById(id).orElseThrow(()->new MyException("Khong ton tai danh gia nay"));
        reviews.setStatus(!reviews.getStatus());
        reviewRepository.save(reviews);
    }

    @Override
    public void deleteById(int id) {
        Reviews reviews=reviewRepository.findById(id).orElseThrow(()->new MyException("Khong ton tai danh gia nay"));
        if(reviews==null){
            throw new MyException("Danh gia nay da bi xoa");
        }
       reviewRepository.deleteById(id);

    }
}

