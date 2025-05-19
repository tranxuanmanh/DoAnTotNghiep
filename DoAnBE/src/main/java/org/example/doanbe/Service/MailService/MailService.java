package org.example.doanbe.Service.MailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.example.doanbe.Exception.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    @Autowired
    private JavaMailSender javaMailSender;
    public void sendSimpleMail(String to, String subject, String content){
        try{
            MimeMessage message=javaMailSender.createMimeMessage();
            MimeMessageHelper helper=new MimeMessageHelper(message,true,"UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content,true);
            javaMailSender.send(message);
            System.out.println("Email send success");
        }catch (MessagingException ex){
            throw new MyException("Co loi xay ra khi gui mail: "+ex.getMessage());
        }
    }

}
