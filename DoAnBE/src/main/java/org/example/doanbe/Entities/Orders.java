package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Base.BaseEntity;
import org.example.doanbe.Entities.Enum.ORDERSTATUS;
import org.example.doanbe.Entities.Enum.PAYMETHOD;
import org.example.doanbe.Entities.Enum.SHIPPINGMETHOD;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="orders")
@Entity
public class Orders  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int order_id;
    @Column(name="order_code",nullable = false)
    private String orderCode;
    //Tong so tien
    @Column(name="total_amount",nullable = false)
    private Double totalAmount;
    //Hinh thuc thanh toan
    @Column(name="payment_method",nullable = false)
    @Enumerated(EnumType.STRING)
    private PAYMETHOD payMethod;
     //Trang thai thanh toan
    @Column(name="payment_status",nullable = false)
    private Boolean paymentStatus;
    //Ngay dat hang
    @Column(name="order_date")
    private LocalDateTime orderDate;
    //Tinh trang don hang
    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private ORDERSTATUS orderStatus;

    //Them luu y
    @Column(name="note",columnDefinition = "TEXT")
    private String note;

    //Hinh thuc van chuyen
    @Column(name="shipping_method")
    @Enumerated(EnumType.STRING)
    private SHIPPINGMETHOD shippingMethod;

    //Phi ship hang
    @Column(name = "shipping_fee")
    private Double shippingFee;

    //Ten day du nguoi nhan
    @Column(name="full_name")
    private String fullName;

    //So dien thoai nguoi nhan
    @Column(name="phone_number")
    private String phoneNumber;

    //Dia chi nguoi nhan hang
    @Column(name="address",columnDefinition = "TEXT")
    private String address;

    //Don hang hoan thanh luc nao
    @Column(name="completed_at")
    private LocalDateTime completedAt;
    @Column(name="update_at")
    private LocalDateTime updateAt;

    //Giao hang vao luc nao,chi dung voi hinh thuc van chuyen la giao vao luc nao
    @Column(name="delivery_time")
    private LocalDateTime deliveryTime;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnoreProperties(value = {"order","username","password","verificationToken","isVerified","status","createAt","updateAt"})
   // @JsonBackReference
    private Users user;

    // 1 don hang co nhieu san pham order_item
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Order_Item> orderItems;

    //1 Don hang dung 1 Voucher
    @ManyToOne
    @JoinColumn(name="voucher_id")
    private Voucher voucher;

}
