package org.example.doanbe.Controller;

import org.example.doanbe.Entities.Order_Item;
import org.example.doanbe.Repositories.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/order-item")
public class OrderItemController {
    @Autowired
    private OrderItemsRepository orderItemsRepository;
    @GetMapping
    public List<Order_Item> orderItemsList(){
        return orderItemsRepository.findAll();
    }
}
