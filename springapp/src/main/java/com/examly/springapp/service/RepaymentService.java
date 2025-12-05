package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepository;
import com.examly.springapp.exception.LoanNotFoundException;

@Service
public class RepaymentService {

    @Autowired
    private LoanRepository loanRepository;

    // ------------------ CREATE ------------------
    public Loan saveLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    // ------------------ READ ------------------
    public List<Loan> getAllLoans() {
        return loanRepository.findAll(); // plain list for tests
    }

    public Page<Loan> getLoans(String loanName, Pageable pageable) {
        if (loanName != null && !loanName.isEmpty()) {
            return loanRepository.findByLoanNameContainingIgnoreCase(loanName, pageable);
        }
        return loanRepository.findAll(pageable);
    }

    public Loan getLoanById(Long id) {
        return loanRepository.findById(id)
                .orElseThrow(() -> new LoanNotFoundException(id));
    }

    // ------------------ UPDATE ------------------
    public Loan updateLoan(Long id, Loan loan) {
        Loan existingLoan = loanRepository.findById(id)
                .orElseThrow(() -> new LoanNotFoundException(id));

        existingLoan.setLoanName(loan.getLoanName());
        existingLoan.setPrincipal(loan.getPrincipal());
        existingLoan.setInterestRate(loan.getInterestRate());
        existingLoan.setTermMonths(loan.getTermMonths());

        return loanRepository.save(existingLoan);
    }

  

    // ------------------ DELETE ------------------
    public void deleteLoan(Long id) {
        if (!loanRepository.existsById(id)) {
            throw new LoanNotFoundException(id);
        }
        loanRepository.deleteById(id);
    }

    // ------------------ REPAYMENT PLAN ------------------
    public List<Loan> calculateRepaymentPlan(String method) {
        List<Loan> loans = loanRepository.findAll();

        if (loans.isEmpty()) {
            return loans; // return empty list
        }

        if (method == null || method.isEmpty() || "snowball".equalsIgnoreCase(method)) {
            loans.sort((a, b) -> Double.compare(a.getPrincipal(), b.getPrincipal()));
        } else if ("avalanche".equalsIgnoreCase(method)) {
            loans.sort((a, b) -> Double.compare(b.getInterestRate(), a.getInterestRate()));
        } else {
            throw new IllegalArgumentException("Invalid repayment method: " + method);
        }

        return loans;
    }
}
