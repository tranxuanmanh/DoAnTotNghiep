package org.example.doanbe.Repositories;

import org.example.doanbe.Entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher,Integer> {
    Voucher findByVoucherCode(String code);// get voucher by code
}
