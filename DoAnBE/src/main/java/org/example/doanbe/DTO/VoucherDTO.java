package org.example.doanbe.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Enum.VoucherEnum;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class VoucherDTO {
    private String description;
    private Double minOrder;
    private Double discount;
    private Integer quantity;
    private VoucherEnum voucherStatus;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime startDate;
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime endDate;


}
