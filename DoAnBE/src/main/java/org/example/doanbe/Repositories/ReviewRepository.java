package org.example.doanbe.Repositories;

import org.example.doanbe.DTO.Response.ReviewResponse;
import org.example.doanbe.Entities.Order_Item;
import org.example.doanbe.Entities.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository  extends JpaRepository<Reviews,Integer> {

    List<Reviews> findByProductId(int productId);

    boolean existsByProductId(int id);
    boolean existsByOrderItem(Order_Item order);

    boolean existsByUserId(int id);

    List<Reviews> findAllByRating(int start);
}
