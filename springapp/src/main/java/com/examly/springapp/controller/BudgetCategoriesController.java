package com.examly.springapp.controller;

import com.examly.springapp.model.BudgetCategories;
import com.examly.springapp.service.BudgetCategoriesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget/categories")
public class BudgetCategoriesController {

    private final BudgetCategoriesService service;

    public BudgetCategoriesController(BudgetCategoriesService service) { this.service = service; }

    @PostMapping
    public BudgetCategories create(@RequestBody BudgetCategories bc) { return service.save(bc); }

    @GetMapping("/{id}")
    public BudgetCategories get(@PathVariable Long id) { return service.findById(id); }

    @GetMapping("/user/{userId}")
    public List<BudgetCategories> getUserBudget(@PathVariable Long userId) {
        return service.findByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}

