package com.ed.edms.controller;

import com.ed.edms.pojo.MessageResponse;
import com.ed.edms.service.SubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.NameAlreadyBoundException;

@RestController
@RequestMapping("/api/user/sub/")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // Получаем айди чела, который идет в подписки текущего пользователя
    @PostMapping("/add/{id}")
    public ResponseEntity<?> addOneSubscriptionAndSubscriber(@PathVariable Long id) {
        return new ResponseEntity<>(subscriptionService.addSubscription(id), HttpStatus.OK);
    }

    // Получаем список подписчиков текущего пользователя
    @GetMapping("/subscribers")
    public ResponseEntity<?> getAllSubscribers() {
        return new ResponseEntity<>(subscriptionService.getAllSubscribers(), HttpStatus.OK);
    }

    // Получаем список подписок текущего пользователя
    @GetMapping("/subscriptions")
    public ResponseEntity<?> getAllSubscriptions() {
        return new ResponseEntity<>(subscriptionService.getAllSubscriptions(), HttpStatus.OK);
    }

    // Удаляет подписку на определенного пользователя
    @DeleteMapping("/delete/subscription/{id}")
    public ResponseEntity<?> deleteSubscriber(@PathVariable Long id) {
        return new ResponseEntity<>(subscriptionService.deleteSubscription(id), HttpStatus.OK);
    }

    // Удаляет подписчика текущего пользователя
    @DeleteMapping("/delete/subscriber/{id}")
    public ResponseEntity<?> deleteOneSubscriptionAndSubscriber(@PathVariable Long id) {
        return new ResponseEntity<>(subscriptionService.deleteSubscriber(id), HttpStatus.OK);
    }
}
