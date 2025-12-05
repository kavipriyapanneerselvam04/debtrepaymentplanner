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
@Table(name = "BudgetCategories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetCategories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String categoryName;

    @Enumerated(EnumType.STRING)
    private CategoryType categoryType;

    private BigDecimal allocatedAmount;
    private BigDecimal actualAmount;

    private Date budgetMonth;

    public enum CategoryType {
        INCOME, FIXED_EXPENSE, VARIABLE_EXPENSE, DEBT_PAYMENT, SAVINGS, INVESTMENT
    }
}
