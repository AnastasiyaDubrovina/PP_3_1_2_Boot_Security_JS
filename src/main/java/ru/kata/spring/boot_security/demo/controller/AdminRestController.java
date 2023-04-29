package ru.kata.spring.boot_security.demo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/api")
public class AdminRestController {
    private UserService userService;

    @Autowired
    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> allUsers(Model model) throws JsonProcessingException {
        List<User> userList = userService.getAllUsers();
//        List<Role> roleList = userService.findAllRoles();
////        return userList;
//        String userListJson = new ObjectMapper().writeValueAsString(userList);
        return ResponseEntity.ok(userList);
    }


    @PostMapping(value = "/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userService.saveUser(user);
        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/admin/users/{id}")
                .buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uriOfNewResource).body(user);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id)  {
        User user = userService.showById(id);
        return ResponseEntity.ok(user);
    }

    @PatchMapping(value = "/users/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void update(@RequestBody User user, @PathVariable("id") Long id, Model model) {
        userService.updateUserById(id, user, model);
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        userService.removeUserById(id);
    }


}
