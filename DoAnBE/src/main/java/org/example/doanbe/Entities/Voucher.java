package org.example.doanbe.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Enum.VoucherEnum;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="voucher")
@AllArgsConstructor
@NoArgsConstructor
@Data
//Bang quan li khuyen mai
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="voucher_id")
    private int voucherId;
    @Column(name="voucher_code")
    private String voucherCode;
    @Column(name="description")
    private String description;
    @Column(name="min_order")
    private Double minOrder;
    @Column(name="discount")
    private Double discount;
    @Column(name="quantity")
    private Integer quantity;


    @Column(name="start_date")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime startDate;
    @Column(name="end_date")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime endDate;
    @Enumerated(value = EnumType.STRING)
    @Column(name="voucher_status")
    private VoucherEnum voucherStatus;
    @Column(name="number_used")
    private int numberUsed;

    @OneToMany(mappedBy = "voucher")
    @JsonIgnore
    private List<Orders> orders;

    @PrePersist
    public void createCodeRandom(){
        if (this.voucherCode == null || this.voucherCode.isEmpty()) { // Chỉ tạo khi chưa có mã
            this.voucherCode = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 10).toUpperCase();
            //this.voucherStatus=true;

        }
    }


}
