package org.example.doanbe.Service.ServiceInterface;

import org.example.doanbe.DTO.Response.ReviewResponse;
import org.example.doanbe.DTO.ReviewDTO;
import org.example.doanbe.Entities.Reviews;

import java.util.List;

public interface ReviewService {
    Reviews addReview(ReviewDTO reviewDTO);
    List<ReviewResponse> findByProductId(int id);
    List<ReviewResponse> findAllByRating(int start);

    void updateStatus(int id);
    void deleteById(int id);
}
