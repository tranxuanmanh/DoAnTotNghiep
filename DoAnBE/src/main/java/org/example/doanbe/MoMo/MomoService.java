package org.example.doanbe.MoMo;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.doanbe.Exception.MyException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MomoService {
    @Value(value = "MOMO")
    private String PARTNER_CODE;
    @Value(value = "${momo.access_key}")
    private String ACCESS_KEY;
    @Value(value = "${momo.secretKey}")
    private String SECRET_KEY;
    @Value(value = "${momo.return_url}")
    private String REDIRECT_URL;
    @Value(value = "${momo.ipn_url}")
    private String IPN_URL;
    @Value(value = "${momo.request_type}")
    private String REQUEST_TYPE;

    private final MomoApi momoApi;
    public CreateMomoResponse createMomoResponse()  {
        String orderId= UUID.randomUUID().toString();
        String orderInfo="Thanh toan don hang: "+orderId;
        String extraData="Khong co khuyen mai";
        String requestId=UUID.randomUUID().toString();
        long amount=250000;
        // Tạo raw data để ký
        String rawData = String.format(
                "accessKey=%s&amount=%d&extraData=%s&ipnUrl=%s&orderId=%s&orderInfo=%s&partnerCode=%s&redirectUrl=%s&requestId=%s&requestType=%s",
                ACCESS_KEY,
                amount,
                extraData,
                IPN_URL,
                orderId,
                orderInfo,
                PARTNER_CODE,
                REDIRECT_URL,
                requestId,
                REQUEST_TYPE
        );
        System.out.println(rawData);
        // Tạo chữ ký
        String signature="";
        try {
             signature = signHmacSHA256(rawData, SECRET_KEY);
        }catch (Exception e){
            throw new MyException("Da co loi xay ra khi hash code");

        }
        if(signature.isEmpty()){
            throw new MyException("Chu ky null");

        }
        CreateMomoRequest request=CreateMomoRequest.builder().
                                partnerCode(PARTNER_CODE).
                                amount(amount).
                                requestType(REQUEST_TYPE).
                                ipnUrl(IPN_URL).
                                redirectUrl(REDIRECT_URL).
                                orderId(orderId).
                                orderInfo(orderInfo).
                                requestId(requestId).
                                extraData(extraData).
                                signature(signature).
                                lang("vi").
                                build();
        return momoApi.createMomoQR(request);
    }
    private String signHmacSHA256(String data, String key) throws Exception {
        Mac hmacSHA256 = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        hmacSHA256.init(secretKeySpec);

        byte[] hash = hmacSHA256.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();

        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }

        return hexString.toString();
    }
}
