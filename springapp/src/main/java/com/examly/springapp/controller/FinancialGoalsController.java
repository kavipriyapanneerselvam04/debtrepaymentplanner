package com.examly.springapp.controller;

import com.examly.springapp.model.FinancialGoals;
import com.examly.springapp.service.FinancialGoalsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class FinancialGoalsController {

    private final FinancialGoalsService service;

    public FinancialGoalsController(FinancialGoalsService service) { this.service = service; }

    @PostMapping
    public FinancialGoals create(@RequestBody FinancialGoals fg) { return service.save(fg); }

    @GetMapping("/{id}")
    public FinancialGoals get(@PathVariable Long id) { return service.findById(id); }

    @GetMapping("/user/{userId}")
    public List<FinancialGoals> getUserGoals(@PathVariable Long userId) {
        return service.findByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
