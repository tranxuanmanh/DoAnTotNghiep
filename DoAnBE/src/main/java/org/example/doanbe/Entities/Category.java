package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Base.BaseEntity;

import java.util.List;

@Entity
@Table(name = "categories")
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonPropertyOrder({ "category_id", "name","description", "createAt", "updateAt" })

public class Category extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="category_id")
    private int category_id;
    @Column(name="name",columnDefinition = "varchar(50)")
    private String name;
    @Column(name="parent_id")
    private Integer parentId;
    @Column(name="description",columnDefinition = "TEXT")
    private String description;
    @Column(name="status")
    private Boolean status;
    @Column(name="images",columnDefinition = "varchar(255)")
    private String images;

    //1 danh muc co nhieu san pham
    @OneToMany(mappedBy = "category")
    @JsonManagedReference

    private List<Product> products;
}
