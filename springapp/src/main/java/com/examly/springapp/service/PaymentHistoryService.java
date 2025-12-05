package com.examly.springapp.service;

import com.examly.springapp.model.PaymentHistory;
import com.examly.springapp.repository.PaymentHistoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaymentHistoryService {
    private final PaymentHistoryRepository repo;

    public PaymentHistoryService(PaymentHistoryRepository repo) { this.repo = repo; }

    public PaymentHistory save(PaymentHistory ph) { return repo.save(ph); }

    public PaymentHistory findById(Long id) { return repo.findById(id).orElseThrow(() -> new RuntimeException("Payment not found")); }

    public List<PaymentHistory> findByDebt(Long debtId) { return repo.findByDebtAccountId(debtId); }

    public void delete(Long id) { repo.deleteById(id); }
}
