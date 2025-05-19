package org.example.doanbe.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangePasswordRequest {
    @NotBlank(message = "Không duoc de trong mat khau cu")
    String oldPassword;
    @NotBlank(message = "Khong duoc de trong mat khau moi")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
    )
    String newPassword;
    @NotBlank(message = "Khong duoc de trong xac nhan mat khau")
    String confirmPassword;
}
