package ru.kata.spring.boot_security.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.security.UserDetailsImpl;
import ru.kata.spring.boot_security.demo.service.UserService;
import javax.transaction.Transactional;


@Controller
@Transactional
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/index")
    public String index(Model model) {
        return "index";
    }


    @GetMapping("/admin/users")
    public String allUsers(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "users";
    }

    @GetMapping("/user")
    public String showUserInfo(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        model.addAttribute("user", userDetails.getUser());
        return "show";
    }

    @GetMapping("/admin/user/{id}")
    public String showUser(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.showById(id));
        return "show";
    }

    @GetMapping("/admin/new")
    public String newUser(@ModelAttribute("user") User user, Model model) {
        model.addAttribute("allRoles", userService.findAllRoles());
        return "new";
    }

    @PostMapping("/admin/users")
    public String createOrUpdate(@ModelAttribute("user") User user, Model model) {
        userService.saveUser(user, model);
        return "redirect:/admin/users";
    }

    @GetMapping("/admin/users/{id}/edit")
    public String edit(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.showById(id));
        model.addAttribute("allRoles", userService.findAllRoles());
        return "edit";
    }

//    @PatchMapping("/admin/users/{id}")
//    public String updateOrSave(@ModelAttribute("user") User user, @PathVariable("id") Long id, Model model) {
////        userService.updateUserById(id, user);
//        userService.updateUserById(id, user);
//        return "redirect:/admin/users";
//    }

    @DeleteMapping("/admin/user/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.removeUserById(id);
        return "redirect:/admin/users";
    }


}
