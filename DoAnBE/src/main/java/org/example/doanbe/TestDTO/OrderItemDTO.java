package org.example.doanbe.TestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.doanbe.Entities.Enum.PAYMETHOD;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItemDTO {
    private int productId;
    private int quantity;

    private List<Integer> toppings;
}
