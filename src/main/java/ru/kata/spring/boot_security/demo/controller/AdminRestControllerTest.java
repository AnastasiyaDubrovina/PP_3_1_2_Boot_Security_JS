package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

    @RestController
    @RequestMapping("/api")
    public class AdminRestControllerTest {
        private UserService userService;

        @Autowired
        public AdminRestControllerTest(UserService userService) {
            this.userService = userService;
        }

        @GetMapping("/admin")
        public List<User> getAllUSer() {
            return userService.getAllUsers();
        }
}