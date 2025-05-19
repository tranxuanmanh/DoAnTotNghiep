package org.example.doanbe.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImageDTO {

    private String image_url;//Luu link anh tren cloudinary

    private String public_id;// id cua hinh anh khi xoa
}
