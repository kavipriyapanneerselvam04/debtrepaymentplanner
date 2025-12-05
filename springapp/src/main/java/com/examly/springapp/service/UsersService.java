package com.examly.springapp.service;

import com.examly.springapp.model.Users;
import com.examly.springapp.repository.UsersRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsersService {

    private final UsersRepository repo;

    public UsersService(UsersRepository repo) {
        this.repo = repo;
    }

    public Users createUser(Users user) { return repo.save(user); }

    public Users getUserById(Long id) { return repo.findById(id).orElseThrow(() -> new RuntimeException("User not found")); }

    public List<Users> getAllUsers() { return repo.findAll(); }

    public Users updateUser(Long id, Users updated) {
        Users existing = getUserById(id);
        existing.setUsername(updated.getUsername());
        existing.setEmail(updated.getEmail());
        existing.setRole(updated.getRole());
        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setIsActive(updated.getIsActive());
        return repo.save(existing);
    }

    public void deleteUser(Long id) { repo.deleteById(id); }
}
