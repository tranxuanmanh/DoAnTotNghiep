package org.example.doanbe.TestService;

import org.example.doanbe.DTO.Request.ChangePasswordRequest;
import org.example.doanbe.DTO.Request.UserRegister;
import org.example.doanbe.Entities.Roles;
import org.example.doanbe.Entities.Users;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.RoleRepository;
import org.example.doanbe.Repositories.UserRepository;
import org.example.doanbe.Service.JwtService.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;
    //Chuoi random token khi nguoi dung dang ki tai khoan
    @Autowired
    private JwtProvider jwtProvider;
    public static String uuid= UUID.randomUUID().toString().split("-")[4];
    @Autowired
    private RoleRepository roleRepository;

    //Đăng ki user mới
    @Override
    public Users userSignUp(UserRegister userRegister) {
      // Users user=userRepository.findByEmail(userRegister.getEmail());
//        Users user=userRepository.findByUsernameAndEmailContaining(
//                userRegister.getUsername(),userRegister.getEmail());
        boolean emailExists = userRepository.existsByEmail(userRegister.getEmail());
        boolean usernameExists = userRepository.existsByUsername(userRegister.getUsername());
        if (emailExists) {
            throw new RuntimeException("Email đã được sử dụng!! Vui long nhap email khac");
        }
        if (usernameExists) {
            throw new RuntimeException("Username đã tồn tại!! Vui long nhap username khac");
        }
//        if(!emailExists && !usernameExists){
           Users user=new Users();
            user.setEmail(userRegister.getEmail());
            user.setPhone(userRegister.getPhone());
            user.setFullName(userRegister.getFullName());
            user.setUsername(userRegister.getUsername());
            String pass=passwordEncoder.encode(userRegister.getPassword());
            user.setPassword(pass);
            user.setStatus(true);
            //Neu nguoi dung ko nhap role thi mac dinh la user
            Roles role=roleRepository.findByRoleName(userRegister.getRole());
            user.setRole(role);
            //lưu uuid vào csdl luôn
            user.setVerificationToken(uuid);
            user.setIsVerified(false);
            return userRepository.save(user);
 //       }
//        throw new MyException("User đã tồn tại trong hệ thống");
    }


    //Xac thuc token xem co hop le khong trong gmail
    //Xác thực đúng thì đặt lại chuỗi token là rỗng
    @Override
    public Users verifyToken(String token){
        Users user=userRepository.findByVerificationToken(token);
        if(user!=null){
            user.setIsVerified(true);
            user.setVerificationToken(null);
            return userRepository.save(user);
        }
    throw new MyException("Token không hợp lệ.Vui lòng kiểm tra lại");
    }

    @Override
    public Users fogetPassword(String email) {
        Users user=userRepository.findByEmail(email);
        if(user==null){
            throw new MyException("Email khong co trong he thong!!Vui long kiem tra lai");
        }
        if(!user.getIsVerified()){
            throw new MyException("Email chưa xác thực");
        }
        if(!user.getStatus()){
            throw new MyException("Tài khoản đã bị khóa.Vui lòng liên hệ admin để biết thêm chi tiết");
        }

        //Mật khẩu cấp lại cũng được mã hóa
        user.setPassword(passwordEncoder.encode(uuid));
        user.setVerificationToken(uuid);

        return userRepository.save(user);
    }

    @Override
    public Users findByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<Users> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public Users newPassword(ChangePasswordRequest changePassWord, String token) {
        String username=jwtProvider.getUserName(token);
        Users user=userRepository.findByUsername(username);
      if(!passwordEncoder.matches(changePassWord.getOldPassword(),user.getPassword())){
          throw new MyException("Mật khẩu cũ không đúng.Vui lòng kiểm tra lại");
      }else if(!changePassWord.getNewPassword().equals(changePassWord.getConfirmPassword())){
          throw new MyException("Mật khẩu mới không khớp.Vui lòng kiểm tra lại");
      }
        user.setPassword(passwordEncoder.encode(changePassWord.getNewPassword()));
        return userRepository.save(user);
    }

    @Override
    public Users findById(int id) {
        return userRepository.findById(id).orElseThrow(()->new MyException("User not fond"));
    }

    @Override
    public List<Users> findAllByRole(int roleId) {
        return userRepository.findAllByRole(roleId);
    }

    @Override
    public void updateStatus(int id) {
        Users user=userRepository.findById(id).orElseThrow(()->new MyException("Không tìm thấy user"));
        if(user.getStatus()){
            user.setStatus(false);
        }else {
            user.setStatus(true);
        }
        userRepository.save(user);
    }
}
