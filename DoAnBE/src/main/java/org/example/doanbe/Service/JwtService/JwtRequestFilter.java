package org.example.doanbe.Service.JwtService;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.doanbe.Exception.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        final String requestTokenHeader=request.getHeader("Authorization");
        //System.out.println("Header: "+requestTokenHeader);
        String userName="";
        String token="";
        if(requestTokenHeader!=null&&requestTokenHeader.startsWith("Bearer ")){
            token=requestTokenHeader.substring(7);
           // System.out.println("Token: "+token);
            try{

                userName=jwtProvider.getUserName(token);
                //System.out.println("UserName: "+userName);
            }catch (IllegalArgumentException | ExpiredJwtException ex){
               throw new MyException("Token khong hop le!!!");
            }
        }
        else if (requestTokenHeader == null || !requestTokenHeader.startsWith("Bearer ")) {
//            System.out.println("Không có token hoặc token không hợp lệ");
            filterChain.doFilter(request, response);
            return;
        }
        if(userName!=null&& SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails=userDetailsService.loadUserByUsername(userName);
            if(jwtProvider.validationToken(token,userDetails)){
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request,response);

    }
}
