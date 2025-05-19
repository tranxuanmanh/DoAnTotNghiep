package org.example.doanbe.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Roles;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class JwtResponse {
    private String token;
    private int userId;
    private String fullName;
    private String email;
    private String phone;
    private Roles roles;
}
