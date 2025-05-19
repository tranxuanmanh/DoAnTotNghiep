package org.example.doanbe.Repositories;

import org.example.doanbe.Entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users,Integer> {
    Users findByUsername(String userName);
    boolean existsByUsername(String userName);
    boolean existsByEmail(String email);
    Users findByEmail(String email);
    Users findByVerificationToken(String token);

    @Query(value = "SELECT * FROM users WHERE role_id = ?1 ", nativeQuery = true)
    List<Users> findAllByRole(int roleId);
}
