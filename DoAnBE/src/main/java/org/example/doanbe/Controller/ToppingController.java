package org.example.doanbe.Controller;

import org.example.doanbe.Entities.Topping;
import org.example.doanbe.Repositories.ToppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/topping")
public class ToppingController {
    @Autowired
    private ToppingRepository toppingRepository;
    @GetMapping
    public List<Topping> getAllTopping(){
        return toppingRepository.findAll();
    }
    @GetMapping("/{id}")
    public Topping getToppingById(@PathVariable int id){
        return toppingRepository.findById(id).orElse(null);
    }
    @PutMapping("/status/{id}")
    public Topping updateStatus(@PathVariable int id){
        Topping topping=toppingRepository.findById(id).orElse(null);
        if(topping!=null){
            topping.setStatus(!topping.getStatus());
           return toppingRepository.save(topping);
        }
        return null;
    }
    @PutMapping("/{id}")
    public Topping updateTopping(@PathVariable int id,@RequestBody Topping topping){
        Topping topping1=toppingRepository.findById(id).orElse(null);
        if(topping1!=null){
            topping1.setName(topping.getName());
            topping1.setPrice(topping.getPrice());
            topping1.setStatus(topping.getStatus());
            return toppingRepository.save(topping1);
        }
        return null;
    }
    @PostMapping
    public Topping updateTopping(@RequestBody Topping topping){
        //Topping topping1=
            Topping topping1=new Topping();
            topping1.setName(topping.getName());
            topping1.setPrice(topping.getPrice());
            topping1.setStatus(topping.getStatus());
            topping1.setToppingTag(topping.getToppingTag());
            return toppingRepository.save(topping1);


    }

}
