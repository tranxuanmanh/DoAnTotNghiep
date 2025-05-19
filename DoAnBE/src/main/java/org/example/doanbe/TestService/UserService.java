package org.example.doanbe.TestService;

import org.example.doanbe.DTO.Request.ChangePasswordRequest;
import org.example.doanbe.DTO.Request.UserRegister;
import org.example.doanbe.Entities.Users;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Users userSignUp(UserRegister userRegister);
    Users verifyToken(String token);
    Users fogetPassword(String email);
    Users findByUserName(String username);
    List<Users> getAllUser();

    Users findById(int id);

    Users newPassword(ChangePasswordRequest changePassWord, String token);

    List<Users> findAllByRole(int roleId);

    void updateStatus(int id);
}
