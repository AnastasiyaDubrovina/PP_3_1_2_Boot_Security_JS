package ru.kata.spring.boot_security.demo.dao;

//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;


@Repository
public class UserDaoImpl implements UserDao {
    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public void saveUser(User user) {    /////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//        user.setRoles(Collections.singleton(new Role(user.getRoles().stream().findAny().toString())));
        if (!user.persisted()) {
            entityManager.persist(user);
        } else {
            entityManager.merge(user);
        }
    }

    @Override
    public void updateUserById(Long id, User user) {
//        User userToBeUpdated = showById(id);
//        userToBeUpdated.setUsername(user.getUsername());
//        userToBeUpdated.setPassword(user.getPassword());
//        userToBeUpdated.setEmail(user.getEmail());
//        userToBeUpdated.setRoles(user.getRoles());
        entityManager.merge(user);
    }

    @Override
    public User showById(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User findByUsername(String username) {
        Query query = entityManager.createQuery("select u from User u left join fetch u.roles where u.username=:username", User.class);
        query.setParameter("username", username);
        return (User) query.getSingleResult();
    }

    @Override
    public void removeUserById(Long id) {
        entityManager.remove(entityManager.find(User.class, id));

    }


    @Override
    @SuppressWarnings("unchecked")
    public List<User> getAllUsers() {
        return entityManager.createQuery(
                "select u from User u").getResultList(); //User.class
    }


}
