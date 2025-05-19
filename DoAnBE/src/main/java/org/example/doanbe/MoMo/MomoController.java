package org.example.doanbe.MoMo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/checkout")
public class MomoController {
    @Autowired
    private  MomoService momoService;
    @PostMapping("create")
    public CreateMomoResponse createQR() {
        return momoService.createMomoResponse();
    }
}
