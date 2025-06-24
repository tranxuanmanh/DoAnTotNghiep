package org.example.doanbe.Service.ServiceImpl;
import org.example.doanbe.DTO.*;
import org.example.doanbe.Entities.*;
import org.example.doanbe.Entities.Enum.ORDERSTATUS;
import org.example.doanbe.Entities.Enum.PAYMETHOD;
import org.example.doanbe.Entities.Enum.SHIPPINGMETHOD;
import org.example.doanbe.Exception.MyException;
import org.example.doanbe.Repositories.*;
import org.example.doanbe.Service.MailService.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemsRepository orderItemsRepository;
    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private ToppingRepository toppingRepository;

    @Autowired
    private MailService mailService;

    @Transactional
    public Orders createOrder(OrderDTO orderDTO) {

        double totalPriceOrder = 0;
        Orders order = new Orders();
        order.setOrderCode(orderDTO.getOrderCode());
        //Set ngày đặt hàng
        order.setOrderDate(LocalDateTime.now());
        //Traạng thái ban đầu khi đơn hàng được đặt
        order.setOrderStatus(ORDERSTATUS.CHOXULY);
        //Lay user theo id
        Users user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        //Gui email khi dat hang
        String emailContent = "Cảm ơn bạn đã đặt hàng tại cửa hàng của chúng tôi. Mã đơn hàng của bạn là: " + orderDTO.getOrderCode();
        mailService.sendSimpleMail(user.getEmail(), "Cảm ơn bạn đã đặt hàng", emailContent);
        //setUser trong order
        order.setUser(user);
        //Lay ten nguoi nhan hang
        order.setFullName(orderDTO.getFullName());
        //Lay so dien thoai ng nhan hang
        order.setPhoneNumber(orderDTO.getPhoneNumber());
        //Lay dia chi nguoi nhan
        order.setAddress(orderDTO.getAddress());
        //Chu thích
        order.setNote(orderDTO.getNote());
        //Người dùng chọn phương thức thanh toan
        //Neu de trong thi bao loi->Nen bat ơ front end
        if (orderDTO.getPayMethod() == null) {
            throw new MyException("Khong duoc de trong phuong thuc thanh toan");
        } else {
            //Neu phuong thức là chuyển khoản thì set Traạng thái thanh toán là đã thanh toán(Can tich
            // hop thanh toan tu dong )
            if (orderDTO.getPayMethod().equals(PAYMETHOD.CHUYENKHOAN)) {
                order.setPayMethod(orderDTO.getPayMethod());
                order.setPaymentStatus(orderDTO.getPayStatus());
            } else if (orderDTO.getPayMethod().equals(PAYMETHOD.TIENMAT)) { //Neu la tien mat thi trang thai thanh toan la False
                order.setPayMethod(orderDTO.getPayMethod());
                order.setPaymentStatus(false);
            }
        }
        //Nguoi dung chon hinh thuc van chuyen
        if (orderDTO.getShippingMethod() == null) {
            order.setShippingMethod(SHIPPINGMETHOD.GIAONGAY);
        }
        if(orderDTO.getShippingMethod().equals(SHIPPINGMETHOD.GIAOVAOLUC)){
            order.setShippingMethod(SHIPPINGMETHOD.GIAOVAOLUC);
            order.setDeliveryTime(orderDTO.getDeliveryTime());
        }
        order.setShippingMethod(orderDTO.getShippingMethod());
        orderRepository.save(order);

        List<Order_Item> orderItemsList = new ArrayList<>();

        for (OrderItemDTO item : orderDTO.getOrderItems()) {
            Order_Item orderItem = new Order_Item();
            orderItem.setOrder(order);

            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product không tồn tại"));
            orderItem.setProduct(product);

            orderItem.setQuantity(Math.max(item.getQuantity(), 0));//Neu nho hon 0 thi so luong = 0

            orderItem.setPriceItem(product.getPriceSell()==null?product.getPrice():product.getPriceSell());

            orderItemsRepository.save(orderItem);

            orderItemsList.add(orderItem);

            List<Topping> itemToppings = new ArrayList<>();
            double totalPriceTopping = 0;
            if (item.getToppings() != null) {
                for (Integer item2 : item.getToppings()) {
                    Topping topping = toppingRepository.findById(item2).orElseThrow(() -> new MyException("Khong ton tai topping nay"));
                    // Kiểm tra xem topping có thuộc product của orderItem không
                    if (!orderItem.getProduct().getToppings().contains(topping)) {
                        throw new MyException("Topping này không thuộc sản phẩm " + orderItem.getProduct().getName());
                    }
                    //tong tien cua topping
                    totalPriceTopping += topping.getPrice();
                    toppingRepository.save(topping);
                    itemToppings.add(topping);
                }
            }
            orderItem.setToppings(itemToppings);
            //Tính tong tien cua orderItem
            double subTotalPrice = (totalPriceTopping+orderItem.getPriceItem())*orderItem.getQuantity();
            orderItem.setSubPrice(subTotalPrice);
            totalPriceOrder += subTotalPrice ;
        }
        //Nếu có voucher thì giảm giá
        Optional<Voucher> voucher = voucherRepository.findById(orderDTO.getVoucherId());
        Double totalAmount = order.getTotalAmount() != null ? order.getTotalAmount() : totalPriceOrder;

        //Hinh thuc giao hang
        if(orderDTO.getShippingMethod().equals(SHIPPINGMETHOD.GIAOVAOLUC)){
            order.setShippingFee(10000.0);
            totalAmount+=10000d;
        }
        else if(orderDTO.getShippingMethod().equals(SHIPPINGMETHOD.GIAONGAY)){
            order.setShippingFee(15000.0);
            totalAmount+=15000d;
        }else if(orderDTO.getShippingMethod().equals(SHIPPINGMETHOD.DENLAY)){
            order.setShippingFee(0.0);

        }

        if (voucher.isPresent()) {
            if (totalAmount >= voucher.get().getMinOrder()) {
                totalAmount -= voucher.get().getDiscount();
                order.setVoucher(voucher.get());
                voucher.get().setNumberUsed(voucher.get().getNumberUsed() + 1);
                voucherRepository.save(voucher.get());
            }
        }
        order.setOrderItems(orderItemsList);
        order.setTotalAmount(totalAmount);

        //Update lại số lượng san pham khi thêm sản phẩm vào đơn hàng
        updateQuantityAndSoldQuantity(order);

        //Luu don hang
        orderRepository.save(order);

        return order;
    }

    @Transactional
    public Orders UpdateOrderStatus(int orderId, String status) {
        Optional<Orders> orders = orderRepository.findById(orderId);
        if (orders.isPresent()) {
            Orders orders1 = orders.get();
            orders1.setUpdateAt(LocalDateTime.now());
            switch (status) {
                //case "CHOXULY":
                   // orders1.setOrderStatus(ORDERSTATUS.CHOXULY);
                    //Khi moi dat hang thi tru luon so luong san pham
//                    updateQuantityAndSoldQuantity(orders1);
                   //break;
                case "CHAPTHUAN":
                    for (Order_Item item : orders1.getOrderItems()) {
                        Product product = productRepository.findById(item.getProduct().getProduct_id()).orElseThrow(() -> new MyException("Not found"));

                        if (product.getQuantity() <= 0) {
                            throw new MyException("So luong san pham " + product.getName()+" khong du!!!Vui long them so luong san pham");
                        }
                    }
                    orders1.setOrderStatus(ORDERSTATUS.CHAPTHUAN);
//                    updateQuantityAndSoldQuantity(orders1);
                    break;

                case "GIAOHANG":
                    orders1.setOrderStatus(ORDERSTATUS.GIAOHANG);

                    break;

                case "GIAOTHANHCONG":
                    orders1.setOrderStatus(ORDERSTATUS.GIAOTHANHCONG);
                    orders1.setPaymentStatus(true);
                    break;

                case "HOANTAT":
                    orders1.setOrderStatus(ORDERSTATUS.HOANTAT);
                    orders1.setCompletedAt(LocalDateTime.now());
                    orders1.setPaymentStatus(true);
//                    updateQuantityAndSoldQuantity(orders1);
                    break;

                case "HUY":
                    orders1.setOrderStatus(ORDERSTATUS.HUY);
                    orders1.setCompletedAt(LocalDateTime.now());
                    HuyDonHang(orders1);
                    break;
            }
           return orderRepository.save(orders1);
        }else{
            throw new MyException("Khong ton tai don hang nay");
        }
    }

    public Orders getOrderByCode(String code){
        return orderRepository.getOrdersByOrderCode(code);
    }


    // ✅ Phương thức riêng để cập nhật tồn kho & số lượng đã bán
    private void updateQuantityAndSoldQuantity(Orders order) {
        for (Order_Item item : order.getOrderItems()) {
            Product product = item.getProduct();
                int quantity = item.getQuantity();//So luong ban
                product.setQuantity(product.getQuantity()-quantity);
                product.setSold_quantity(quantity + product.getSold_quantity());//So luong da ban
                product.setStatus(product.getQuantity() != 0);
              //Update lai so luong
                productRepository.save(product);
            }
        }
        private void HuyDonHang(Orders order){
            for (Order_Item item : order.getOrderItems()) {
                Product product = item.getProduct();
                int quantity = item.getQuantity();//So luong ban
                product.setQuantity(product.getQuantity()+quantity);
                product.setSold_quantity( product.getSold_quantity()-quantity);//So luong da ban
                //Update lai so luong
                productRepository.save(product);
            }
        }

        //get doanh thu theo thang trong nam
        public List<RevenueByMonthDTO> getRevenueByMonth(String year) {
            List<Object[]> results = orderRepository.revenueByMonthInYear(year);

            return results.stream().map(row -> {
                int month = ((Number) row[0]).intValue();
                double total = row[1] != null ? ((Number) row[1]).doubleValue() : 0.0;
                return new RevenueByMonthDTO(month, total);
            }).collect(Collectors.toList());
        }
        //Thong ke don hang hoan tat,huy
        public List<MonthOrderStatusDTO> getOrderStatusByMonth(int year) {
            return orderRepository.getOrderStatusByMonth(year);
        }
        //Dem so don hang theo trang thai
        public Integer countOrdersByOrderStatus(ORDERSTATUS orderStatus) {
            return orderRepository.countOrdersByOrderStatus(orderStatus);
        }


}

