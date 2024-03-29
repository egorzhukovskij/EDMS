package com.ed.edms.controller;

import com.ed.edms.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DashboardController {
    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/users/countries")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUsersCountries(){
        return new ResponseEntity<>(dashboardService.getUserCountries(), HttpStatus.OK);
    }

    @GetMapping("/users/documents")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserDocuments(){
        return new ResponseEntity<>(dashboardService.getUserDocumentsCount(), HttpStatus.OK);
    }

    @GetMapping("/users/subscribers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserSubscribers(){
        return new ResponseEntity<>(dashboardService.getUserSubscribersCount(), HttpStatus.OK);
    }

    @GetMapping("/users/documents/size")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserDocumentsSize(){
        return new ResponseEntity<>(dashboardService.getUserDocumentsSizeCount(), HttpStatus.OK);
    }

}
