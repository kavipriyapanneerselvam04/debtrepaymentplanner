package com.examly.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String loanName;
    private double principal;
    private double interestRate;
    private int termMonths;
    public Loan( String loanName, double principal, double interestRate, int termMonths) {
 
        this.loanName = loanName;
        this.principal = principal;
        this.interestRate = interestRate;
        this.termMonths = termMonths;
    }
    public Long getId() {
      
         return id;
    }



}
