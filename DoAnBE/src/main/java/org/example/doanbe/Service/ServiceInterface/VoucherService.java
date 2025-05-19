package org.example.doanbe.Service.ServiceInterface;

import org.example.doanbe.DTO.VoucherDTO;
import org.example.doanbe.Entities.Voucher;

import java.util.List;

public interface VoucherService {
    //Add voucher
    Voucher addVoucher(VoucherDTO voucherDTO);

    //Get voucher theo id
    Voucher getVoucherById(int id);
    //GetAll
    List<Voucher> getAllVoucher();
    //Find Voucher By id
   Voucher findByVoucher_Code(String code);

   Voucher updateById(int id,VoucherDTO voucherDTO);
   void deleteVoucherById(int id);
   //update status
//    void updateVoucherStatus(int id);
}
