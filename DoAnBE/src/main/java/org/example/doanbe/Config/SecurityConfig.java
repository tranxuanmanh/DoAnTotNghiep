package org.example.doanbe.Config;

import org.example.doanbe.Service.JwtService.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    @Autowired
    private UserDetailsService userDetailsService;
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider dao=new DaoAuthenticationProvider();
        dao.setPasswordEncoder(passwordEncoder());
        dao.setUserDetailsService(userDetailsService);
        return dao;
    }

@Bean
public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return new ProviderManager(authenticationProvider());
}
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors->cors.configurationSource(corsConfigurationSource())
                )
                .authorizeHttpRequests(
                        auth->auth.requestMatchers(EndPoints.All).permitAll()
                                   .requestMatchers(EndPoints.API_ADMIN_Client).hasAnyAuthority("ROLE_ADMIN","ROLE_CLIENT","ROLE_STAFF")

                                .requestMatchers(HttpMethod.POST,
                                           "/api/v1/product",
                                           "/api/v1/voucher",
                                           "/api/v1/category",
                                           "/api/v1/news"
                                ).hasAnyAuthority("ROLE_ADMIN","ROLE_STAFF")

                                .requestMatchers(HttpMethod.GET,
                                        "/api/v1/user/role/**"

                                ).hasAuthority("ROLE_ADMIN")

                                .requestMatchers(HttpMethod.PUT,
                                           "/api/v1/category/status/{id}",
                                            "/api/v1/category/{id}",
                                           "/api/v1/user/update-status/{id}"
                                   ).hasAuthority("ROLE_ADMIN")
                                   .requestMatchers(HttpMethod.DELETE,"/api/v1/category/{id}").hasAuthority("ROLE_ADMIN")
                                  .anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtRequestFilter,UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173","http://localhost:5174")); // Cho phép React gọi API
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true); // Cho phép gửi cookie/token

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
