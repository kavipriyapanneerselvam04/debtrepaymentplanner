package com.examly.springapp.controller;

import com.examly.springapp.model.RepaymentStrategies;
import com.examly.springapp.service.RepaymentStrategiesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/strategies")
public class RepaymentStrategiesController {

    private final RepaymentStrategiesService service;

    public RepaymentStrategiesController(RepaymentStrategiesService service) { this.service = service; }

    @PostMapping
    public RepaymentStrategies create(@RequestBody RepaymentStrategies rs) { return service.save(rs); }

    @GetMapping("/{id}")
    public RepaymentStrategies get(@PathVariable Long id) { return service.findById(id); }

    @GetMapping("/user/{userId}")
    public List<RepaymentStrategies> getUserStrategies(@PathVariable Long userId) {
        return service.findByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
