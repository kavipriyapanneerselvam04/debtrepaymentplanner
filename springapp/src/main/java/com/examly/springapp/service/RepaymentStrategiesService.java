package com.examly.springapp.service;

import com.examly.springapp.model.RepaymentStrategies;
import com.examly.springapp.repository.RepaymentStrategiesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepaymentStrategiesService {
    private final RepaymentStrategiesRepository repo;

    public RepaymentStrategiesService(RepaymentStrategiesRepository repo) { this.repo = repo; }

    public RepaymentStrategies save(RepaymentStrategies rs) { return repo.save(rs); }

    public RepaymentStrategies findById(Long id) { return repo.findById(id).orElseThrow(() -> new RuntimeException("Strategy not found")); }

    public List<RepaymentStrategies> findByUser(Long userId) { return repo.findByUserId(userId); }

    public void delete(Long id) { repo.deleteById(id); }
}
