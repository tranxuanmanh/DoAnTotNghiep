package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name="Reviews")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_id")
    private int reviewId;

//    @OneToOne
//    @JoinColumn(name="user_id",nullable = false)
//    @JsonIgnoreProperties(value = {"username","password","order","verificationToken","status","isVerified","createAt","updateAt"})
    @Column(name="user_id")
    private int userId;

    @Column(name="product_id")
    private int productId;

    @OneToOne
    @JoinColumn(name = "order_item_id", unique = true, nullable = false)
    private Order_Item orderItem;

    @Column(name="rating")
    private int rating;

    @Column(name="comment")
    private String comment;

    @Column(name="status")
    private Boolean status;

    private LocalDateTime createdAt = LocalDateTime.now();
}
