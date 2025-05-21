package org.example.doanbe.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewResponse {
    private int id;
    private int productId;
    private int userId;
    private String userName;
    private int start;
    private String comment;
    private boolean status;
    private LocalDateTime createdAt;
}
