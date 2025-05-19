package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Base.BaseEntity;

import java.util.List;

@Table(name="toppings")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Topping {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name="topping_id")
        private int toppingId;

        @Column(name="name",nullable = false)
        private String name;

        @Column(name="price",nullable = false)
        private Double price;

        @Column(name="tag_topping")
        private String toppingTag;

        @Column(name="status")
        private Boolean status;

        // 1 topping nằm trong nhiều product_topping --- thu xoa
//        @OneToMany(mappedBy = "topping")
//        @JsonIgnore
//        private List<Product_Topping> toppings;

//        @ManyToOne
//        @JoinColumn(name="product_id")
//        @JsonIgnore
        @ManyToMany(mappedBy = "toppings")
        @JsonIgnore
        private List<Product> products;

        // 1 topping nằm trong nhiều orderItemTopping
//        @OneToMany(mappedBy = "topping")
//        @JsonIgnore
//        private List<Order_Topping> orderItemToppings;
        @ManyToMany(mappedBy = "toppings")
        @JsonIgnore
        List<Order_Item> orderItems;
}
