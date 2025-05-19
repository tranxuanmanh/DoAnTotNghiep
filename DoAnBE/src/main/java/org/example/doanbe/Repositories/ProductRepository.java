package org.example.doanbe.Repositories;

import org.example.doanbe.DTO.ProductTop5;
import org.example.doanbe.Entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {
    @Query(value="select * from products p where name like %?1%",nativeQuery = true)
    List<Product> findAllByNameLike(String name);

    Page<Product> findAllByStatus(Boolean status,Pageable pageable);

    @Query(value="select name,sold_quantity from products order by sold_quantity desc limit 5;",nativeQuery = true)
    List<ProductTop5> getTopProduct();

    @Query(value = "SELECT p.name, p.sold_quantity FROM products p " +
            "WHERE p.sold_quantity>1 and  p.update_at BETWEEN :start AND :end " +
            "ORDER BY p.sold_quantity DESC limit 5",nativeQuery = true)
    List<ProductTop5> findTop5ByUpdatedAtBetween(@Param("start") LocalDateTime start,
                                                @Param("end") LocalDateTime end);

}
