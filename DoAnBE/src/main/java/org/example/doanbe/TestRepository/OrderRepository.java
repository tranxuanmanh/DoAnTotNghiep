package org.example.doanbe.TestRepository;

import org.example.doanbe.DTO.MonthOrderStatusDTO;
import org.example.doanbe.Entities.Enum.ORDERSTATUS;
import org.example.doanbe.Entities.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders,Integer> {

    Orders getOrdersByOrderCode(String code );

   @Query(value = "select * from orders o where o.status=?1 ",nativeQuery = true)
    List<Orders> getAllOrderByStatus(String status);
    @Query(value = "select sum(o.total_amount) from orders o " +
            "where o.status in ('HOANTAT','GIAOTHANHCONG')  and date(completed_at)=STR_TO_DATE(?1, '%d-%m-%Y')",
            nativeQuery = true)
    Double revenueDay(String ngay);
    @Query(value = "select sum(o.total_amount) " +
            "from orders o where o.status in ('HOANTAT','GIAOTHANHCONG') and  year(completed_at)=?1" +
            " and month(completed_at)=?2",
            nativeQuery = true)
    Double revenueMonth(String nam,String thang);
    @Query(value = "select sum(o.total_amount) from orders o " +
            "where o.status in ('HOANTAT','GIAOTHANHCONG') and year(completed_at)=?1",
            nativeQuery = true)
    Double revenueYear(String nam);
    //Thong ke san pham da ban duoc trong ngay
    //Thong ke san pham da ban da ban dc trong thang
    //Trong nam
    //San pham ban nhieu nhat trong ngay
    //San pham ton kho nhieu nhat


    @Query(value = """
    SELECT MONTH(completed_at) AS month, SUM(o.total_amount) AS total
    FROM orders o
    WHERE o.status = 'HOANTAT' AND YEAR(completed_at) = ?1
    GROUP BY MONTH(completed_at)
    ORDER BY MONTH(completed_at)
    """, nativeQuery = true)
    List<Object[]> revenueByMonthInYear(String year);

    //Doanh thu theo tung nam
//    @Query(value = """
//    SELECT YEAR(completed_at) AS year, SUM(o.total_amount) AS total
//    FROM orders o
//    WHERE o.status = 'HOANTAT'
//    GROUP BY YEAR(completed_at)
//    ORDER BY YEAR(completed_at)
//    """, nativeQuery = true)
//    List<Object[]> revenueByYear();

//Thong ke don hang Hoan tat,Huy

 @Query(value = """
    SELECT 
        MONTH(o.completed_at) AS month,
        SUM(CASE WHEN o.status = 'HOANTAT' THEN 1 ELSE 0 END) AS hoantat,
        SUM(CASE WHEN o.status = 'HUY' THEN 1 ELSE 0 END) AS huy
    FROM orders o
    WHERE YEAR(o.completed_at) = :year
    GROUP BY MONTH(o.completed_at)
    ORDER BY MONTH(o.completed_at)
    """, nativeQuery = true)
 List<MonthOrderStatusDTO> getOrderStatusByMonth(@Param("year") int year);

//Đếm theo status
   Integer countOrdersByOrderStatus(ORDERSTATUS orderStatus);



}
