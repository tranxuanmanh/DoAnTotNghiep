package org.example.doanbe.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Base.BaseEntity;

@Entity
@Table(name = "News")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class News extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="user_id")
    private int user_id;
    @Column(name="title")
    private String title;
    @Column(name="content",columnDefinition = "TEXT")
    private String content;
    @Column(name="thumbnail")
    private String thumbnail;
    @Column(name="status")
    private Boolean status;

}
