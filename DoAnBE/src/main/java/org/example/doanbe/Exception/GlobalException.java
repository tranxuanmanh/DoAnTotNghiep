package org.example.doanbe.Exception;

import jakarta.persistence.EntityNotFoundException;
import org.example.doanbe.APIResponse.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class GlobalException {
    //Lỗi do tôi tự định nghĩa
    @ExceptionHandler(value = MyException.class)
    public ResponseEntity<ApiResponse<String>> apiResponse(MyException ex){
        ApiResponse<String> apiResponse=new ApiResponse<>(400,ex.getMessage(),null);
        return ResponseEntity.status(400).body(apiResponse);
    }
    //Khong tim thay du lieu hop le
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> apiResponse(EntityNotFoundException ex){
        ApiResponse<String> apiResponse=new ApiResponse<>(404,ex.getMessage(),null);
        return ResponseEntity.status(404).body(apiResponse);
    }
    // Bắt lỗi validate dữ liệu không hợp lệ (thường dùng với @Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<String>> handleValidationException(MethodArgumentNotValidException ex) {
            String errorMessage = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();
            ApiResponse<String> response = new ApiResponse<>(400, errorMessage, null);
            return ResponseEntity.status(400).body(response);
        }
    //Bat loi chung
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGlobalException(Exception ex) {
        ApiResponse<String> response = new ApiResponse<>(500, "Có lỗi xảy ra: " + ex.getMessage(), null);
        return ResponseEntity.status(500).body(response);
    }
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiResponse<String>> handleMaxSizeException(MaxUploadSizeExceededException ex) {
        ApiResponse<String> response = new ApiResponse<>(500, "Kích thước file quá lớn: " + ex.getMessage(), null);
        return ResponseEntity.status(400).body(response);
    }
}
