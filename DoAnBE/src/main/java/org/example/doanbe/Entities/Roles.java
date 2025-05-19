package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Enum.ROLE;

import java.util.List;

@Table(name="roles")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="role_id")
    private int role_id;
    @Column(name="role_name")
    @Enumerated(value = EnumType.STRING)
    private ROLE roleName;
    @OneToMany(mappedBy = "role")
    @JsonIgnore
    private List<Users> users;

}
