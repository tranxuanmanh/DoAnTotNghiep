package org.example.doanbe.Controller;

import org.example.doanbe.DTO.Response.ReviewResponse;
import org.example.doanbe.DTO.ReviewDTO;
import org.example.doanbe.Entities.Reviews;
import org.example.doanbe.Repositories.ReviewRepository;
import org.example.doanbe.Service.ServiceInterface.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/review")
public class ReviewController {
    @Autowired
    private ReviewService review;
    @GetMapping("/all/{id}")
    public List<ReviewResponse> getAllReview(@PathVariable int id){
       return review.findByProductId(id);
    }
    @PostMapping("/add")
    public Reviews addReview(@RequestBody ReviewDTO reviewdto){
        return review.addReview(reviewdto);
    }
    @GetMapping("/rating/{start}")
    public List<ReviewResponse> getAllByRating(@PathVariable int start){
        return review.findAllByRating(start);
    }
    @PutMapping("/update/{id}")
    public void updateStatus(@PathVariable int id){
        review.updateStatus(id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteReview(@PathVariable int id){
        review.deleteById(id);
    }
}
