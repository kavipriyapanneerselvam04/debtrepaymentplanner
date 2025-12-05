package com.examly.springapp.repository;

import com.examly.springapp.model.FinancialGoals;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FinancialGoalsRepository extends JpaRepository<FinancialGoals, Long> {
    List<FinancialGoals> findByUserId(Long userId);
}
