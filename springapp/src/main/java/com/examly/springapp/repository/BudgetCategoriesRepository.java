package com.examly.springapp.repository;

import com.examly.springapp.model.BudgetCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BudgetCategoriesRepository extends JpaRepository<BudgetCategories, Long> {
    List<BudgetCategories> findByUserId(Long userId);
}
