package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name="order_item")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Order_Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="order_id")
    @JsonBackReference
    private Orders order;

    @ManyToOne
    @JoinColumn(name="product_id")
//   @JsonBackReference
    private Product product;

    @Column(name="quantity",nullable = false)
    private int quantity;

    @Column(name="price_item")//Tong tien 1 san pham bao gom ,topping
    private double priceItem;

    @Column(name="sub_price")//Tong tien 1 san pham bao gom ,topping
    private double subPrice;

    // 1 san pham co the chon nhieu topping
//    @OneToMany(mappedBy = "orderItem")
//    @JsonManagedReference
//    private List<Order_Topping> toppings;

    @ManyToMany
    @JoinTable(name="order_topping",
            joinColumns = @JoinColumn(name="order_item_id"),
            inverseJoinColumns = @JoinColumn(name="topping_id"))
    private List<Topping> toppings;


//    public double calculateSubTotal() {
//        double toppingTotal = toppings.stream()
//                .mapToDouble(t -> t.getTopping().getPrice() * t.getQuantity())
//                .sum();
//        return (size.getPrice() + toppingTotal) * quantity;
//    }



}
