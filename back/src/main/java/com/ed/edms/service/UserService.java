package com.ed.edms.service;


import com.ed.edms.entity.Person;
import com.ed.edms.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAll();

    Optional<User> getOne(Long id);

    Person getUserPersonDetails(Long id);

    User deleteOneUser(Long id);

    User updateOneUser(Long id, User user);

    User updateUserDetails(Long id, Person person);
}
