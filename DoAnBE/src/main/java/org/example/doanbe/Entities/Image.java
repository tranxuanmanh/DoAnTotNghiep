package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="images")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="image_id")
    private int image_id;
    @Column(name="image_url",nullable = false)
    private String image_url;//Luu link anh tren cloudinary
    @Column(name="public_id")
    private String publicId;// id cua hinh anh khi xoa

    @ManyToOne
    @JoinColumn(name="product_id")
    @JsonBackReference
    private Product product;

}
