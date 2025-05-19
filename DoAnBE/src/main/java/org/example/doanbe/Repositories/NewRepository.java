package org.example.doanbe.Repositories;
import org.example.doanbe.Entities.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewRepository extends JpaRepository<News,Integer> {
}
