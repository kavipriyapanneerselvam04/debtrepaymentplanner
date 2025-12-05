package com.examly.springapp.model;


import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "DebtAccount")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DebtAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 100)
    private String creditorName;

    @Lob
    private byte[] accountNumber; // encrypted

    @Enumerated(EnumType.STRING)
    private DebtType debtType;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal currentBalance;

    private BigDecimal originalBalance;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal interestRate;

    @Column(nullable = false, precision = 8, scale = 2)
    private BigDecimal minimumPayment;

    private Integer dueDate; // Day of month

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;

    private BigDecimal creditLimit;
    private Date lastPaymentDate;
    private BigDecimal lastPaymentAmount;
    private BigDecimal promotionalRate;
    private Date promotionalEndDate;

    @Lob
    private String notes;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    // ENUMS
    public enum DebtType {
        CREDIT_CARD, STUDENT_LOAN, MORTGAGE, AUTO_LOAN, PERSONAL_LOAN, MEDICAL_DEBT
    }

    public enum AccountStatus {
        ACTIVE, CLOSED, PAID_OFF, DEFAULT
    }

    // Set default values before persisting
    @PrePersist
    public void prePersist() {
        this.createdDate = new Date();
        this.updatedDate = new Date();
        if (this.accountStatus == null) {
            this.accountStatus = AccountStatus.ACTIVE;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedDate = new Date();
    }
}
