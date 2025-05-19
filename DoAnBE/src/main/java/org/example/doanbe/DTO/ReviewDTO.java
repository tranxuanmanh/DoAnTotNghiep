package org.example.doanbe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private int productId;
    private int userId;
    private int orderItemId;
    private int rating;
    private String comment;
}
