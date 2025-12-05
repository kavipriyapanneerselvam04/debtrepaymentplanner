package com.examly.springapp.service;

import com.examly.springapp.model.DebtAccount;
import com.examly.springapp.repository.DebtAccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DebtAccountService {

    private final DebtAccountRepository repository;

    public DebtAccountService(DebtAccountRepository repository) {
        this.repository = repository;
    }

    // Create
    public DebtAccount createDebt(DebtAccount debtAccount) {
        return repository.save(debtAccount);
    }

    // Read by ID
    public DebtAccount getDebtById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Debt not found with id: " + id));
    }

    // Read by User
    public List<DebtAccount> getUserDebts(Long userId) {
        return repository.findByUserId(userId);
    }

    // Update
    public DebtAccount updateDebt(Long id, DebtAccount updated) {
        DebtAccount existing = getDebtById(id);
        existing.setCreditorName(updated.getCreditorName());
        existing.setCurrentBalance(updated.getCurrentBalance());
        existing.setInterestRate(updated.getInterestRate());
        existing.setMinimumPayment(updated.getMinimumPayment());
        existing.setDueDate(updated.getDueDate());
        existing.setAccountStatus(updated.getAccountStatus());
        return repository.save(existing);
    }

    // Delete
    public void deleteDebt(Long id) {
        repository.deleteById(id);
    }
}
