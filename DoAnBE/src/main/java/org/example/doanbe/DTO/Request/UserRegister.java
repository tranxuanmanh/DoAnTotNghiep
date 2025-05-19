package org.example.doanbe.DTO.Request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Enum.ROLE;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserRegister {
    @NotBlank(message = "Không được để trống họ ten")
    private String fullName;
    @NotBlank(message = "Không được để trống so dien thoai")
    private String phone;
    @NotBlank(message = "Không được để trống tên đăng nhập")
    private String username;
    @NotBlank(message = "Không được để trống mật khẩu")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
    )
    private String password;
    @Email(message = "Sai định dạng email")
    @NotBlank(message = "Không được để trống email")
    private String email;

    private ROLE role=ROLE.ROLE_CLIENT;

}
