package com.examly.springapp.model;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "FinancialGoals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinancialGoals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String goalName;

    @Enumerated(EnumType.STRING)
    private GoalType goalType;

    private BigDecimal targetAmount;
    private BigDecimal currentAmount;

    private Date targetDate;

    public enum GoalType {
        DEBT_PAYOFF, EMERGENCY_FUND, SAVINGS, INVESTMENT, MAJOR_PURCHASE, RETIREMENT
    }
}
