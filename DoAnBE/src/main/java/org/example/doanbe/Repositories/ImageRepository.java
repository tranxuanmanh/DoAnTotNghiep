package org.example.doanbe.Repositories;

import org.example.doanbe.Entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,Integer> {
    List<Image> findByPublicIdIn(List<String> publicId);
}
