package org.example.doanbe.TestService;

import org.example.doanbe.DTO.UserDTO;
import org.example.doanbe.Entities.Users;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users=userService.findByUserName(username);
        if(users==null){
            throw new MyException("User not found");
        }
        if(!users.getIsVerified()){
            throw new MyException("Tài khoản chưa được xác thực.Vui lòng kiểm tra lại email");
        }
        if(!users.getStatus()){
            throw new MyException("Tài khoản đã bị khóa.Vui lòng liên hệ admin để biết thêm chi tiết");
        }
        return new MyUserDetail(users);
    }
}
