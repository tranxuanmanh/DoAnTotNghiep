package org.example.doanbe.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NewDTO {
    private String title;
    private String content;
    private Integer userId;
    private Boolean status;
}
