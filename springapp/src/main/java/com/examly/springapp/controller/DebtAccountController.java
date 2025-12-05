package com.examly.springapp.controller;

import com.examly.springapp.model.DebtAccount;
import com.examly.springapp.service.DebtAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debts")
public class DebtAccountController {

    private final DebtAccountService service;

    public DebtAccountController(DebtAccountService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public DebtAccount create(@RequestBody DebtAccount debtAccount) {
        return service.createDebt(debtAccount);
    }

    // Get by ID
    @GetMapping("/{id}")
    public DebtAccount getById(@PathVariable Long id) {
        return service.getDebtById(id);
    }

    // Get all debts by User
    @GetMapping("/user/{userId}")
    public List<DebtAccount> getUserDebts(@PathVariable Long userId) {
        return service.getUserDebts(userId);
    }

    // Update
    @PutMapping("/{id}")
    public DebtAccount update(@PathVariable Long id, @RequestBody DebtAccount debtAccount) {
        return service.updateDebt(id, debtAccount);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteDebt(id);
    }
}
