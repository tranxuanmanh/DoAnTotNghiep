package org.example.doanbe.Service.ServiceInterface;

import org.example.doanbe.DTO.ReviewDTO;
import org.example.doanbe.Entities.Reviews;

import java.util.List;

public interface ReviewService {
    Reviews addReview(ReviewDTO reviewDTO);
    List<Reviews> findByProductId(int id);


}
