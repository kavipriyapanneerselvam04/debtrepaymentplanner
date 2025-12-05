package com.examly.springapp.controller;

import com.examly.springapp.model.Users;
import com.examly.springapp.service.UsersService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final UsersService service;

    public UsersController(UsersService service) { this.service = service; }

    @PostMapping
    public Users create(@RequestBody Users user) { return service.createUser(user); }

    @GetMapping("/{id}")
    public Users getById(@PathVariable Long id) { return service.getUserById(id); }

    @GetMapping
    public List<Users> getAll() { return service.getAllUsers(); }

    @PutMapping("/{id}")
    public Users update(@PathVariable Long id, @RequestBody Users user) { return service.updateUser(id, user); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.deleteUser(id); }
}
