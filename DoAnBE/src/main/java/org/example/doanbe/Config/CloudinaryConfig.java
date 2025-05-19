package org.example.doanbe.Config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary(){
        Map<String,String> config= ObjectUtils.asMap(
                "cloud_name", "ds6yc22b9",
                "api_key", "393822284348961",
                "api_secret", "LpLTyXR_GzwrWNyolxH2ivDrDxI"
               );
        return new Cloudinary(config);
    }
}
