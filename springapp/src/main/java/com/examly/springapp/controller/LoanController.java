
package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Loan;
import com.examly.springapp.service.RepaymentService;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private RepaymentService repaymentService;

    // ------------------ CREATE ------------------
    // Keep 200 OK for tests
    @PostMapping
    public Loan insertLoan(@RequestBody Loan loan) {
        return repaymentService.saveLoan(loan);
    }

    // ------------------ READ ------------------
    // For tests: returns plain List<Loan> (JSON array)
    @GetMapping
    public List<Loan> getAllLoans() {
        return repaymentService.getAllLoans();
    }

    // For frontend: paginated, filtered, sorted
    @GetMapping("/paged")
    public Page<Loan> getLoansPaginated(
            @RequestParam(required = false) String loanName,
            Pageable pageable) {
        return repaymentService.getLoans(loanName, pageable);
    }

    // Get loan by ID
    @GetMapping("/{id}")
    public Loan getLoanById(@PathVariable Long id) {
        return repaymentService.getLoanById(id);
    }

    // ------------------ UPDATE ------------------
    @PutMapping("/{id}")
    public Loan updateLoan(@PathVariable Long id, @RequestBody Loan loan) {
        return repaymentService.updateLoan(id, loan);
    }

    // ------------------ DELETE ------------------
    @DeleteMapping("/{id}")
    public void deleteLoan(@PathVariable Long id) {
        repaymentService.deleteLoan(id);
    }

    // ------------------ REPAYMENT PLAN ------------------
    @GetMapping("/repayment")
    public List<Loan> getRepaymentPlan(
            @RequestParam(name = "method", required = false, defaultValue = "snowball") String method) {
        return repaymentService.calculateRepaymentPlan(method);
    }
}
