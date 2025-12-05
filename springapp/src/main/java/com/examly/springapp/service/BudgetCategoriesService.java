package com.examly.springapp.service;

import com.examly.springapp.model.BudgetCategories;
import com.examly.springapp.repository.BudgetCategoriesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetCategoriesService {
    private final BudgetCategoriesRepository repo;

    public BudgetCategoriesService(BudgetCategoriesRepository repo) { this.repo = repo; }

    public BudgetCategories save(BudgetCategories bc) { return repo.save(bc); }

    public BudgetCategories findById(Long id) { return repo.findById(id).orElseThrow(() -> new RuntimeException("Category not found")); }

    public List<BudgetCategories> findByUser(Long userId) { return repo.findByUserId(userId); }

    public void delete(Long id) { repo.deleteById(id); }
}
