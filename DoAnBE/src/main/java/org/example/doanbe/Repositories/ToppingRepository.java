package org.example.doanbe.Repositories;

import org.example.doanbe.Entities.Topping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToppingRepository extends JpaRepository<Topping,Integer> {
}
