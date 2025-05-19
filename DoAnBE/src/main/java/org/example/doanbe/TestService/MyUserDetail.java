package org.example.doanbe.TestService;

import lombok.Getter;
import org.example.doanbe.DTO.UserDTO;
import org.example.doanbe.Entities.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter
public class MyUserDetail implements UserDetails {
    private Users users;
    public MyUserDetail(Users users){
        this.users=users;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Collections.singletonList(new SimpleGrantedAuthority(users.getRole().getRoleName().toString()));
    }

    @Override
    public String getPassword() {
        return users.getPassword();
    }

    @Override
    public String getUsername() {
        return users.getUsername();
    }


}
