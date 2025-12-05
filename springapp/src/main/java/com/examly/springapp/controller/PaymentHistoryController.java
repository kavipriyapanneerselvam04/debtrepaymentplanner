package com.examly.springapp.controller;

import com.examly.springapp.model.PaymentHistory;
import com.examly.springapp.service.PaymentHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debts/{debtId}/payments")
public class PaymentHistoryController {

    private final PaymentHistoryService service;

    public PaymentHistoryController(PaymentHistoryService service) { this.service = service; }

    @PostMapping
    public PaymentHistory create(@PathVariable Long debtId, @RequestBody PaymentHistory ph) {
        ph.setDebtAccountId(debtId);
        return service.save(ph);
    }

    @GetMapping
    public List<PaymentHistory> list(@PathVariable Long debtId) {
        return service.findByDebt(debtId);
    }

    @GetMapping("/{id}")
    public PaymentHistory get(@PathVariable Long id) {
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
