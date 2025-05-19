package org.example.doanbe.Controller;
import org.example.doanbe.APIResponse.ApiResponse;
import org.example.doanbe.DTO.VoucherDTO;
import org.example.doanbe.Entities.Voucher;
import org.example.doanbe.Service.ServiceInterface.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/voucher")
public class VoucherController {
    @Autowired
    private VoucherService voucherService;
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Voucher>>> getAllVoucher(){
//        Authentication authentication2 = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication2 != null) {
//            System.out.println(" User3: " + authentication2.getName());
//            System.out.println("Authorities3: " + authentication2.getAuthorities());
//        }
        return ResponseEntity.ok(new ApiResponse<>(200,"Get list voucher success",voucherService.getAllVoucher()));
    }
    @GetMapping
    public ResponseEntity<ApiResponse<Voucher>> getVoucherByCode(
            @RequestParam("code") String code
    ){
        return ResponseEntity.ok(new ApiResponse<>(200,"Get voucher by code success",voucherService.findByVoucher_Code(code)));
    }
    @PostMapping
    public ResponseEntity<ApiResponse<Voucher>> addVoucher(@RequestBody VoucherDTO voucherDTO){
        return ResponseEntity.ok(new ApiResponse<>(200,"Add data voucher success",voucherService.addVoucher(voucherDTO)));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteVoucherById(@PathVariable int id){
        voucherService.deleteVoucherById(id);
        return ResponseEntity.ok(new ApiResponse<>(200,"Delete voucher success",null));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Voucher>> putVoucherById(@PathVariable int id,@RequestBody VoucherDTO voucherDTO){
        return ResponseEntity.ok(new ApiResponse<>(200,"Update data success",voucherService.updateById(id,voucherDTO)));

    }

//    @PutMapping("/status/{id}")
//    public ResponseEntity<ApiResponse<Voucher>> updateStatusVoucher(@PathVariable int id){
//        voucherService.updateVoucherStatus(id);
//        return ResponseEntity.ok(new ApiResponse<>(200,"Update status success",null));
//    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<Voucher>> getVoucherById(
            @PathVariable("id") int id
    ){
        return ResponseEntity.ok(new ApiResponse<>(200,"Get voucher by code success",voucherService.getVoucherById(id)));
    }
}
