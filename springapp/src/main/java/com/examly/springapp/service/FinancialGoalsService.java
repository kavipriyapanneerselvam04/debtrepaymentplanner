package com.examly.springapp.service;

import com.examly.springapp.model.FinancialGoals;
import com.examly.springapp.repository.FinancialGoalsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinancialGoalsService {
    private final FinancialGoalsRepository repo;

    public FinancialGoalsService(FinancialGoalsRepository repo) { this.repo = repo; }

    public FinancialGoals save(FinancialGoals fg) { return repo.save(fg); }

    public FinancialGoals findById(Long id) { return repo.findById(id).orElseThrow(() -> new RuntimeException("Goal not found")); }

    public List<FinancialGoals> findByUser(Long userId) { return repo.findByUserId(userId); }

    public void delete(Long id) { repo.deleteById(id); }
}
