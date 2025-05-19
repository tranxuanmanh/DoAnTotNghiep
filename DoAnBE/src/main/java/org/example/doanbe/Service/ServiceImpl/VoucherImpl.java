package org.example.doanbe.Service.ServiceImpl;

import org.example.doanbe.DTO.VoucherDTO;
import org.example.doanbe.Entities.Enum.VoucherEnum;
import org.example.doanbe.Entities.Voucher;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.VoucherRepository;
import org.example.doanbe.Service.ServiceInterface.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherImpl implements VoucherService{
    @Autowired
    private VoucherRepository voucherRepository;
    //Tu dong cap nhat voucher het han
//    @Scheduled(cron="0 0 0 * * ?")
//    public void updateExpiredStatus(){
//        LocalDateTime localDateTime=LocalDateTime.now();
//        List<Voucher> vouchers=voucherRepository.findAll();
//        for(Voucher voucher:vouchers){
//            if(voucher.getEndDate().isBefore(localDateTime)&& voucher.getVoucherStatus()){
//                voucher.setVoucherStatus(false);
//
//            }
//        }
//        voucherRepository.saveAll(vouchers);
//        System.out.println("Da cap nhat trang thai cua voucher");
//    }

//public void updateVoucherStatus(int id){
//    Voucher voucher=voucherRepository.findById(id).orElseThrow(()->new MyException("Khong tim thay voucher nao"));
//    if(voucher.getVoucherStatus()){
//        voucher.setVoucherStatus(false);
//    }else{
//        voucher.setVoucherStatus(true);
//    }
//    voucherRepository.save(voucher);
//}


    public void updateExpiredStatus2(Voucher voucher){

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startDate = voucher.getStartDate();
        LocalDateTime endDate = voucher.getEndDate();

        if (now.isBefore(startDate)) {
            //trước thời gian áp dụng
            voucher.setVoucherStatus(VoucherEnum.CHUAKICHHOAT); // chưa đến thời gian áp dụng
        }
       else if (now.isAfter(endDate)) {
           //Sau thời gian ap dụng
            voucher.setVoucherStatus(VoucherEnum.HETHAN);
        }else{
           //Đang trong thời gian áp dụng
            voucher.setVoucherStatus(VoucherEnum.DANGHOATDONG);
            if(voucher.getNumberUsed()-voucher.getQuantity()==0){
                //Đã hết số lượng
                voucher.setVoucherStatus(VoucherEnum.HETLUOTSUDUNG);
            }
        }

    }
    public void updateVoucherStatus(Voucher voucher){
        updateExpiredStatus2(voucher);
        voucherRepository.save(voucher);
    }
    public void updateAllVoucherStatus(List<Voucher> vouchers) {
        for (Voucher voucher : vouchers) {
            updateExpiredStatus2(voucher);
        }
        voucherRepository.saveAll(vouchers);
    }
    private void mapVoucherFromDTO(Voucher voucher, VoucherDTO voucherDTO) {
        voucher.setDescription(voucherDTO.getDescription());
        voucher.setDiscount(voucherDTO.getDiscount());
        voucher.setQuantity(voucherDTO.getQuantity());
        voucher.setMinOrder(voucherDTO.getMinOrder());
        voucher.setStartDate(voucherDTO.getStartDate());
        voucher.setEndDate(voucherDTO.getEndDate());
        voucher.setVoucherStatus(voucherDTO.getVoucherStatus());
    }
    @Override
    public Voucher addVoucher(VoucherDTO voucherDTO) {
        Voucher voucher=new Voucher();
        mapVoucherFromDTO(voucher,voucherDTO);
        updateVoucherStatus(voucher);
        return voucherRepository.save(voucher);

    }

    @Override
    public List<Voucher> getAllVoucher() {
        List<Voucher> voucher1=voucherRepository.findAll();
        updateAllVoucherStatus(voucher1);

        if(voucher1.isEmpty()){
            throw new MyException("Danh sach voucher rong");
        }
        return voucher1;
    }

    @Override
    public Voucher findByVoucher_Code(String code) {
        Voucher voucher= voucherRepository.findByVoucherCode(code);
        if(voucher==null){
            throw new MyException("Khong tim thay voucher nao");
        }
        return voucher;
    }

    @Override
    public Voucher updateById(int id, VoucherDTO voucherDTO) {
        Voucher voucher1=voucherRepository.findById(id).orElseThrow(()->new MyException("Khong tim thay voucher nao"));

        mapVoucherFromDTO(voucher1,voucherDTO);
        updateVoucherStatus(voucher1);
        return voucherRepository.save(voucher1);
    }

    @Override
    public void deleteVoucherById(int id) {
        Voucher voucher1=voucherRepository.findById(id).orElseThrow(()->new MyException("Khong tim thay voucher nao"));
        voucherRepository.delete(voucher1);
    }

    @Override
    public Voucher getVoucherById(int id) {
        Voucher voucher1=voucherRepository.findById(id).orElseThrow(()->new MyException("Khong tim thay voucher nao"));
        //updateVoucherStatus(voucher1);
        return voucher1;
    }
}
