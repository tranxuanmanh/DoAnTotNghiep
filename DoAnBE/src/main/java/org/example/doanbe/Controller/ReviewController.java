package org.example.doanbe.Controller;

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
    public List<Reviews> getAllReview(@PathVariable int id){
       return review.findByProductId(id);
    }
    @PostMapping("/add")
    public Reviews addReview(@RequestBody ReviewDTO reviewdto){
        return review.addReview(reviewdto);
    }
}
