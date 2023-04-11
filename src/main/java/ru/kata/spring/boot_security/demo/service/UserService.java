package ru.kata.spring.boot_security.demo.service;



import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.ui.Model;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService  {

    void saveUser(User user, Model model);

    void removeUserById(Long id);

    void updateUserById(Long id, User user);

    User showById(Long id);

    List<User> getAllUsers();

    User findByUsername(String username);

    List<Role> findAllRoles();
}
