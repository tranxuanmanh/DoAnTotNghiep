package org.example.doanbe.Controller;

import jakarta.validation.Valid;
import org.example.doanbe.APIResponse.ApiResponse;
import org.example.doanbe.DTO.Request.ChangePasswordRequest;
import org.example.doanbe.DTO.Request.JwtRequest;
import org.example.doanbe.DTO.Request.JwtResponse;
import org.example.doanbe.DTO.Request.UserRegister;
import org.example.doanbe.DTO.Response.UserResponse;
import org.example.doanbe.DTO.TacGiaBaiVietDTO;
import org.example.doanbe.Entities.Users;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Service.JwtService.JwtProvider;
import org.example.doanbe.Service.MailService.MailService;
import org.example.doanbe.TestService.MyUserDetail;
import org.example.doanbe.TestService.MyUserDetailService;
import org.example.doanbe.TestService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private MailService mailService;
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private MyUserDetailService MyUserDetailsService;

    @GetMapping("/all")
    public List<Users> getAllUser(){
        return userService.getAllUser();
    }
    @GetMapping("/name/{username}")
    public Users getUserByName(@PathVariable String username){
        return userService.findByUserName(username);
    }

    @GetMapping("/{id}")
    public Users getUserById(@PathVariable Integer id){
        return userService.findById(id);
    }



    //Endpoint xác thực người dùng khi đăng kí
    @GetMapping("/verify")
    public ResponseEntity<ApiResponse<String>> Verify(@RequestParam("token") String token) {
        //Bên service đã bắt trường hợp null rồi bên này chi cần return về cái đúng
        Users users=userService.verifyToken(token);
        return ResponseEntity.ok(new ApiResponse<>(200,"Xác thực tài khoản thành công","UserName: "+users.getUsername()+"\nPassword: "+users.getPassword()));
    }
    //Dang ki nguoi dung
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> UserRegister(@RequestBody @Valid UserRegister userRegister) {
        Users users= userService.userSignUp(userRegister);
        String content = "Mã xác thực của ban la: "+"<h2>"+ users.getVerificationToken()+"</h2>" ;
        //truy cập api này de xac thuc user : http://localhost:8080/api/v1/user/verify?token=.....
       mailService.sendSimpleMail(users.getEmail(),"Xác thực tài khoản ",content);
       return ResponseEntity.ok(new ApiResponse<>(200,"Đăng kí thành công","Vui lòng kiểm tra gmail để xác thực tài khoản"));
    }
    //Quen mat khau
    @PostMapping("/forget-password")
    public ResponseEntity<ApiResponse<String>> forgetPassword(@RequestParam(name="email" ) String email) {
        Users users= userService.fogetPassword(email);
        String content = "<h2>Mật khẩu mới là: " + users.getVerificationToken() + "</h2>" +
                "<p>Vui lòng không để lộ mật khẩu!!!</p>";
        mailService.sendSimpleMail(users.getEmail(),"Mật khẩu mới ",content);
        //Goi phuong thuc de luu user khi cap nhat
        userService.verifyToken(users.getVerificationToken());
        return ResponseEntity.ok(new ApiResponse<>(200,"Mật khẩu đã được cấp lại","Vui lòng kiểm tra gmail để lấy lại mật khẩu"));
    }


    //Dang nhap
    @PostMapping("/login")
    public ResponseEntity<?> loginWithUserName(@RequestBody JwtRequest jwtRequest){
        try{
            Authentication authentication = authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
            );

            if(authentication.isAuthenticated()){
                SecurityContextHolder.getContext().setAuthentication(authentication);
                UserDetails userDetails = MyUserDetailsService.loadUserByUsername(jwtRequest.getUsername());
               final String token = jwtProvider.generateToken(userDetails.getUsername());

                Users user = ((MyUserDetail) userDetails).getUsers();
                System.out.println("Token: "+token);
                return ResponseEntity.ok(new ApiResponse<>(200,"Login success",new JwtResponse(
                         token,user.getUserId(),
                         user.getFullName(), user.getEmail(), user.getPhone(), user.getRole())));
            }
            Authentication authentication2 = SecurityContextHolder.getContext().getAuthentication();
            if (authentication2 != null) {
                System.out.println("Ho ten: " + authentication2.getName());
                System.out.println("Role: " + authentication2.getAuthorities());
            }
        }catch (Exception e) {
            throw new MyException("Có lỗi xảy ra: "+e.getMessage());

        }
        return null;
    }
    @PutMapping("change-password")
    public ResponseEntity<ApiResponse<Users>> changePassword(@RequestBody @Valid ChangePasswordRequest changePasswordRequest,
                                                              @RequestHeader("Authorization") String token) {
        Users updatedUser = userService.newPassword(changePasswordRequest, token);
        return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật mật khẩu thành công", updatedUser));
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<?>> getAllUserByRole(@PathVariable int roleId){
        List<Users> userLst= userService.findAllByRole(roleId);
        if(userLst.isEmpty()){
            throw new MyException("Không có người dùng nào với roleid: "+roleId);
        }
        List<UserResponse> userResponseList = userLst.stream()
                .map(user -> new UserResponse(user.getUserId(), user.getFullName(),user.getUsername(),user.getPhone(),user.getStatus(), user.getEmail(),user.getCreateAt()))
                .toList();
        return ResponseEntity.ok(userResponseList);
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<ApiResponse<String>> updateStatus(@PathVariable int id){
        userService.updateStatus(id);
        return ResponseEntity.ok(new ApiResponse<>(200,"Cập nhật trạng thái thành công",""));
    }

}
