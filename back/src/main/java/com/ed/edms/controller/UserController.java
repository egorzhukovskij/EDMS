package com.ed.edms.controller;

import com.ed.edms.entity.User;
import com.ed.edms.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user/current")
    public ResponseEntity<?> getCurrentUser() {
        return new ResponseEntity<>(userService.getCurrentUser(), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.getAllWithoutAuth(), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getOne(id), HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> updateUserById(@RequestBody User user) {
        return new ResponseEntity<>(userService.updateOneUser(user), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.deleteOneUser(id), HttpStatus.OK);
    }

    @GetMapping("/user/person/{id}")
    public ResponseEntity<?> getUserPersonDetailsById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserPersonDetails(id), HttpStatus.OK);
    }

}
