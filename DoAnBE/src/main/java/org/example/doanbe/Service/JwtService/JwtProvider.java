package org.example.doanbe.Service.JwtService;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.example.doanbe.Exception.MyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@Slf4j
public class JwtProvider {
        @Value("${jwt.secret}")
        private String secret;
        @Value("${jwt.expiration}")
        private long expiration;
        public String generateToken(String username){
            Map<String,Object> claim=new HashMap<>();
            return createToken(claim,username);
        }

        public String createToken(Map<String, Object> claim, String username) {
            return Jwts.builder()
                    .setClaims(claim)
                    .setSubject(username)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis()+expiration))
                    .signWith(getKey(),SignatureAlgorithm.HS256)
                    .compact();
        }
        public SecretKey getKey(){
            byte[] keyBytes= Decoders.BASE64.decode(secret);
            return Keys.hmacShaKeyFor(keyBytes);
        }
    public Claims extractAllClaim(String token){
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException ex) {
            // Sai chữ ký

            throw new MyException("Sai chu ky "+ ex.getMessage());
        } catch (ExpiredJwtException ex) {
            // Token hết hạn

            throw new MyException("Token het han "+ ex.getMessage());
        } catch (Exception ex) {
            // Các lỗi khác

            throw new MyException("Token khong hop le "+ ex.getMessage());
        }
    }
    public <T> T getClaimFromToken(String token,Function<Claims,T> claimResolver ){
            final Claims claims=extractAllClaim(token);
            return claimResolver.apply(claims);
    }
        public String getUserName(String token){
            return getClaimFromToken(token,Claims::getSubject);
        }
        public Date getExpiration(String token){
            return getClaimFromToken(token,Claims::getExpiration);
        }
        public boolean isTokenExpiration(String token){
            return getExpiration(token).before(new Date());
        }
        public boolean validationToken(String token,UserDetails userDetails){
            String userName=getUserName(token);
            return userName.equals(userDetails.getUsername())&&!isTokenExpiration(token);
        }

}
