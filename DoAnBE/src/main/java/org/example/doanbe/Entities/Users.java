package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Base.BaseEntity;

import java.util.List;

@Table(name="users")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int userId;
    @Column(name="full_name",nullable = false)
    private String fullName;
    @Column(name="username",nullable = false)
    private String username;
    @Column(name="password",nullable = false)
    private String password;
    @Column(name="phone",nullable = false)
    private String phone;
    @Column(name="email",nullable = false)
    private String email;
    @Column(name="verification_token")
    private String verificationToken;

    @Column(name="is_verified")
    private Boolean isVerified;
    @Column(name="status")
    private Boolean status;

    //1 user co 1 role
    @ManyToOne
    @JoinColumn(name="role_id")
    @JsonBackReference
    private Roles role;

    @OneToMany(mappedBy = "user")
//    @JsonIgnore
    @JsonManagedReference
    private List<Orders> order;


}
