package org.example.doanbe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Enum.PAYMETHOD;
import org.example.doanbe.Entities.Enum.SHIPPINGMETHOD;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDTO {
    private int userId;
    private String orderCode;
    private String fullName;
    private String phoneNumber;
    private String address;
    private String note;
    private PAYMETHOD payMethod;
    private Boolean payStatus;
    private int voucherId;
    private SHIPPINGMETHOD shippingMethod;
    private List<OrderItemDTO> orderItems;
    private LocalDateTime deliveryTime;
}
