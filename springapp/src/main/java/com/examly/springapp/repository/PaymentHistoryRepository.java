package com.examly.springapp.repository;

import com.examly.springapp.model.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Long> {
    List<PaymentHistory> findByDebtAccountId(Long debtAccountId);
}

