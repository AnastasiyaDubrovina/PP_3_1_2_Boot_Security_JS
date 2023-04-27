package ru.kata.spring.boot_security.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;


import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

//    //для теста постман
//    @GetMapping()
//    public ResponseEntity<User> showUser( Model model) throws JsonProcessingException {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User userCont = (User) authentication.getPrincipal();
//        model.addAttribute("user", userCont);
////        User user = userService.showById(id);
////        String userJson = new ObjectMapper().writeValueAsString(userCont);
//        return ResponseEntity.ok(userCont);
//    }


//старый
    @GetMapping()
    public String showUserInfo(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        model.addAttribute("user", user);
        return "userPage";

    }
    // предполагаемый
//    @GetMapping("/user")
//    public ResponseEntity<String> showUserInfo(Model model) throws JsonProcessingException {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User user = (User) authentication.getPrincipal();
//        model.addAttribute("user", user);
//        String userJson = new ObjectMapper().writeValueAsString(user);
////        return "userPage";
//        return ResponseEntity.ok(userJson);
//    }




    /////два метода для примера
//    @GetMapping("/user")
//    public ResponseEntity<User> getUser(Principal principal) {
//        return new ResponseEntity<>(convertToUserDto(userService.findByUsername(principal.getName())), HttpStatus.OK);
//    }
//
//    public User convertToUserDto(User user) {
//
//        ModelMapper modelMapper = new ModelMapper();
//        return modelMapper.map(user, User.class);
//
//    }
}
