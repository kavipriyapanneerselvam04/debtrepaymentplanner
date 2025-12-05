package com.examly.springapp.model;

import lombok.*;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RepaymentStrategies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RepaymentStrategies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String strategyName;

    @Enumerated(EnumType.STRING)
    private StrategyType strategyType;

    private BigDecimal totalDebt;
    private BigDecimal monthlyPaymentBudget;

    public enum StrategyType {
        SNOWBALL, AVALANCHE, CUSTOM, CONSOLIDATION
    }
}
