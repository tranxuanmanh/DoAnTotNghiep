package org.example.doanbe.Entities.Base;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {
    @JsonFormat(pattern = "dd-MM-yyyy hh:mm:ss")
    @Column(name="created_at")
    private LocalDateTime createAt;
    @Column(name = "update_at")
    @JsonFormat(pattern = "dd-MM-yyyy hh:mm:ss")
    private LocalDateTime updateAt;
    @PrePersist
    public void CreateAt(){
        this.createAt=LocalDateTime.now();
    }
    @PreUpdate
    public void UpdateAt(){
        this.updateAt=LocalDateTime.now();
    }
}
