package org.example.doanbe.DTO;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDTO {
    @Size(max = 100)
    private String name;

    private String description;
    private Boolean status;//Boolean co the nhan gia tri null
    private String tag;
    @Min(value = 0)
    private Double price;
    @Min(value = 0)
    private Double priceDiscount;

    //Số lượng của 1 sản phẩm
    @Min(value = 0)
    private Integer quantity;
    //Theo dõi số lượng sản phẩm đã bán
    //Không cần
    private int soldQuantity;
    //Category
    private Integer categoryId;
    //Topping ID
    private List<Integer> toppings;

    //Images
//    private List<ImageDTO> images;


}
