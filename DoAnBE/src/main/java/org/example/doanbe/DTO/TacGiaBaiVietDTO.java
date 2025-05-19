package org.example.doanbe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Users;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TacGiaBaiVietDTO {

        private int id;
        private String title;
        private String thumbnail;
        private String content;
        private boolean status;
        private String userName;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        // Constructors, Getters, Setters


}
