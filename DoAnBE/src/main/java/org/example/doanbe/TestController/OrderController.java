package org.example.doanbe.TestController;

import com.cloudinary.Api;
import org.example.doanbe.APIResponse.ApiResponse;
import org.example.doanbe.DTO.RevenueByYearDTO;
import org.example.doanbe.Entities.Enum.ORDERSTATUS;
import org.example.doanbe.Entities.Orders;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.TestDTO.OrderDTO;
import org.example.doanbe.TestRepository.OrderRepository;
import org.example.doanbe.TestService.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Year;
import java.util.Collections;
import java.util.List;

@RequestMapping("api/v1/order")
@RestController
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderService orderService;
    @GetMapping("/all")
    private List<Orders> getAllOrder(){
        return orderRepository.findAll();
    }
    @PostMapping("/add")
    private ResponseEntity<ApiResponse<Orders>> createOrder(@RequestBody OrderDTO orderDTO){
        try {
            Orders order = orderService.createOrder(orderDTO);
            return ResponseEntity.ok(new ApiResponse<>(200,"Success",order));
        }catch (Exception ex){
            throw new MyException("Xay ra loi "+ex.getMessage());
        }
    }
    @GetMapping("/all/{status}")
    private ResponseEntity<?> updateStatusOrder(@PathVariable String status){
        try {
            List<Orders> orders=orderRepository.getAllOrderByStatus(status);
            return ResponseEntity.ok(orders);
        }catch (Exception ex){
            throw new MyException("Xay ra loi "+ex.getMessage());
        }
    }
    //Nen tra ve order
    @PutMapping("/update/{id}")
    private ResponseEntity<?> updateStatusOrder(@PathVariable int id,@RequestParam String status){
        try {
          Orders orderUp=orderService.UpdateOrderStatus(id,status);
          return ResponseEntity.ok(new ApiResponse<>(200,"Cập nhat trang thai thanh cong",orderUp));
        }catch (Exception ex){
            throw new MyException("Xay ra loi "+ex.getMessage());
        }
    }
    @GetMapping("doanhthuNgay")
    public ResponseEntity<ApiResponse<Double>> getDoanhThuNgay(@RequestParam String date){
        Double doanhthuNgay=orderRepository.revenueDay(date);
        if(doanhthuNgay==null){
            doanhthuNgay= (double) 0;
        }
        return ResponseEntity.ok(new ApiResponse<>(200,"Doanh thu ngay "+date,doanhthuNgay));
    }
    @GetMapping("doanhthuThang")
    public ResponseEntity<ApiResponse<Double>> getDoanhThuThang(@RequestParam(name="nam",required = false) String nam, @RequestParam String thang){
       if(nam==null){
           nam= Year.now().toString();
       }
        Double doanhthuThang=orderRepository.revenueMonth(nam,thang);
       if(doanhthuThang==null){
           doanhthuThang= (double) 0;
       }
        return ResponseEntity.ok(new ApiResponse<>(200,"Doanh thu thang "+thang+" nam "+nam,doanhthuThang));
    }
    @GetMapping("doanhthuNam")
    public ResponseEntity<ApiResponse<Double>> getDoanhThuNam(@RequestParam(name="nam",required = false) String nam){
        if(nam==null){
            nam= Year.now().toString();
        }
        Double doanhthuNam=orderRepository.revenueYear(nam);
        if(doanhthuNam==null){
            doanhthuNam= (double) 0;
        }
        return ResponseEntity.ok(new ApiResponse<>(200,"Doanh thu nam "+ nam,doanhthuNam));
    }

    @GetMapping("/order-detail/{code}")
    public ResponseEntity<ApiResponse<Orders>> getOrderByCode(@PathVariable String code){
        return ResponseEntity.ok(new ApiResponse<>(200,"Chi tiet don hang "+code,orderService.getOrderByCode(code)));
    }

    @GetMapping("/doanhthuthang")
    public ResponseEntity<?> getDoanhThuTheoThangTrongNam(@RequestParam String year){
        return ResponseEntity.ok(orderService.getRevenueByMonth(year));
    }
//    @GetMapping("/revenue/by-year")
//    public List<RevenueByYearDTO> getRevenueByYear() {
//        return orderService.getRevenueByYear();
//    }

    @GetMapping("/thongkedonhang")
    public ResponseEntity<?> getOrderStatusByMonth(@RequestParam int year){
        return ResponseEntity.ok(orderService.getOrderStatusByMonth(year));
    }


    @GetMapping("/count-by/{status}")
    public ResponseEntity<?> countOrderByStatus(@PathVariable ORDERSTATUS status){
        return ResponseEntity.ok(orderService.countOrdersByOrderStatus(status));
    }



}
