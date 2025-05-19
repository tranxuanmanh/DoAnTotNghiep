package org.example.doanbe.Config;

public class EndPoints {
    public static final String[] All={
            "/api/v1/user/login",
            "/api/v1/user/verify/**",
            "/api/v1/user/register",
            "/api/v1/user/forget-password/**",
            "/api/v1/product",
            "/api/v1/product/name/**",
            "/api/v1/news/**" ,
            "/api/v1/category/gets",
            "/api/v1/topping/**",
            "api/v1/voucher/**",
            "api/v1/review/all/**",
    };

//    public static final String[] API_ADMIN={
//        "/api/v1/order/all",
//    };
    public static final String[] API_ADMIN_Client={
            "/api/v1/order/add/**",
            "/api/v1/order/all/**",
            "/api/v1/order/order-detail/**",
            "api/v1/review/**",
    };
    public static final String[] API_ADMIN={
            "/api/v1/order/update/**",
            "/api/v1/category/**",
            "/api/v1/news/**" ,
            "/api/v1/product/**",
            "/api/v1/topping/**",
            "api/v1/voucher/**",
    };


}
