package com.examly.springapp.model;


import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "PaymentHistory")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long debtAccountId;

    @Temporal(TemporalType.DATE)
    private Date paymentDate;

    private BigDecimal paymentAmount;

    private String paymentMethod;

    private BigDecimal remainingBalance;
}

