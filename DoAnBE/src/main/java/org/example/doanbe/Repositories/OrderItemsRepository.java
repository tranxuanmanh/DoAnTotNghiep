package org.example.doanbe.Repositories;

import org.example.doanbe.Entities.Order_Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemsRepository extends JpaRepository<Order_Item,Integer> {

}
