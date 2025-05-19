package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Base.BaseEntity;

import java.util.List;

@Entity
@Table(name="products")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private int product_id;
    @Column(name="name",length = 100,nullable = false)
    private String name;
    @Column(name="description",columnDefinition = "TEXT")
    private String description;
    @Column(name="status")

    private Boolean status;//Boolean co the nhan gia tri null
    @Column(name="tag",length = 50)
    private String tag;
    @Column(name="price",nullable = false)
    private Double price;
    @Column(name="price_discount",nullable = false)
    private Double priceDiscount;
    @Column(name="price_sell",nullable = false)
    private Double priceSell;
    //Số lượng của 1 sản phẩm bằng tổng của từng loại size
    @Column(name = "quantity",nullable = false)
    private Integer quantity;
    //Theo dõi số lượng sản phẩm đã bán
    @Column(name="sold_quantity")
    private int sold_quantity;

    //Nhieu san pham thuoc 1 danh muc
    @ManyToOne
    @JoinColumn(name="category_id")
    //@JsonBackReference
    @JsonIncludeProperties({"category_id"})
    private Category category;

   //1 san pham co nhieu topping(N-N)
    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "product_topping",
            joinColumns = @JoinColumn(name= "product_id"),
            inverseJoinColumns = @JoinColumn(name= "topping_id")

    )
//    @JsonManagedReference
    private List<Topping> toppings;



    //1 san pham co nhieu hinh anh
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Image> images;

    // 1 san pham nam trong nhieu order_item
    @OneToMany(mappedBy = "product")
//    @JsonBackReference
    @JsonIgnore
    private List<Order_Item> orderItems;

    //Update quantity product = tong so quantity theo size


}
