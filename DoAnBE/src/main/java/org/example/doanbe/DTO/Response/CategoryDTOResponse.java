package org.example.doanbe.DTO.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoryDTOResponse {
    private int id;
    private String name;
    private String description;
    private Boolean status=true;
    private String images;

}
