package com.examly.springapp.repository;

import com.examly.springapp.model.DebtAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DebtAccountRepository extends JpaRepository<DebtAccount, Long> {
    // Custom query to fetch all debts for a specific user
    List<DebtAccount> findByUserId(Long userId);
}
