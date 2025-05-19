package org.example.doanbe.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SizeDTO {
    private int size_id;
    private String size;
    private Double price; //Giá sản phẩm theo size
    private Boolean is_available;
    private Integer quantity;//So luong san pham theo size
}
