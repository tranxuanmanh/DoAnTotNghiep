package org.example.doanbe.DTO.Response;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private int userId;
    private String fullName;
    private String username;
    private String phone;
    private Boolean status;
    private String email;
    private LocalDateTime createdAt;
}
