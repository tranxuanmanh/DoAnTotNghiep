package org.example.doanbe.ThanhToan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
public class PayOsController {
    @Autowired
    private PayOsService payOsService;

    public PayOsController(PayOsService payOsService) {
        this.payOsService = payOsService;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createPayment(
            @RequestParam(name = "orderCode") long orderCode,
            @RequestParam(name="amount") int amount

    ) throws Exception {
        String url = payOsService.createPaymentLink(orderCode,amount);
        return ResponseEntity.ok(Collections.singletonMap("checkoutUrl", url));
    }
}
// PaymentController.java


