package org.example.doanbe.ThanhToan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.PaymentData;


@Service
public class PayOsService {
    @Autowired
    private PayOS payOS;

    @Value("${payos.return-url}")
    private String returnUrl;

    @Value("${payos.cancel-url}")
    private String cancelUrl;

    public PayOsService(PayOS payOS) {
        this.payOS = payOS;
    }

    public String createPaymentLink(long orderCode,int amount) throws Exception {


        PaymentData paymentData = PaymentData.builder()
                .orderCode(orderCode)
                .amount(amount)
                .description("CK_DH"+orderCode)
                .returnUrl(returnUrl)//  trang thai thanh cong test thu success
                .cancelUrl(cancelUrl)// trang thai thanh toan that bai
                .build();

        CheckoutResponseData result = payOS.createPaymentLink(paymentData);
        return result.getCheckoutUrl();
    }
}




