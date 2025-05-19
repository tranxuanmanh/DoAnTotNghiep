package org.example.doanbe.MoMo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="momo",url = "${momo.endpoint}")
public interface MomoApi {
    @PostMapping("create")
    CreateMomoResponse createMomoQR(@RequestBody CreateMomoRequest createMomoRequest);
}
