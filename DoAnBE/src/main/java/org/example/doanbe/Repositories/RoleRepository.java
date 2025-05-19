package org.example.doanbe.Repositories;

import org.example.doanbe.Entities.Enum.ROLE;
import org.example.doanbe.Entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Roles,Integer> {

        Roles findByRoleName(ROLE roleName);

}
