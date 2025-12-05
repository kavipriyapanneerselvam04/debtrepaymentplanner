package com.examly.springapp;

import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepository;
import com.examly.springapp.service.RepaymentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class SpringappApplicationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LoanRepository repository;

    @Autowired
    private RepaymentService service;

    @Autowired
    private ObjectMapper objectMapper;

    private Loan testLoan;

    @BeforeEach
    public void setup() {
        repository.deleteAll();
        testLoan = new Loan("Car Loan", 10000.0, 5.5, 36);
        repository.save(testLoan);
    }

    @Test
    public void SpringBoot_ProjectAnalysisAndUMLDiagram_InstallSpringBootcreateprojectannotationscontrollerservicelayers() {
        assertThat(repository).isNotNull();
        assertThat(mockMvc).isNotNull();
        assertThat(service).isNotNull();
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_RestControllerServiceGETPOSTendpointsJSONresponse() throws Exception {
        mockMvc.perform(get("/api/loans"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].loanName").value("Car Loan"));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_FullCRUDwithJPARepositoryPathVariableRequestBody() throws Exception {
        Loan newLoan = new Loan("Home Loan", 200000.0, 4.2, 240);

        mockMvc.perform(post("/api/loans")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newLoan)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.loanName").value("Home Loan"));

        List<Loan> loans = repository.findAll();
        assertThat(loans.stream().anyMatch(l -> "Home Loan".equals(l.getLoanName()))).isTrue();
    }

    @Test
    public void SpringBoot_DatabaseAndSchemaSetup_RepositoryFindAllWorks() {
        List<Loan> result = repository.findAll();
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getLoanName()).isEqualTo("Car Loan");
    }

    @Test
    public void SpringBoot_ProjectAnalysisAndUMLDiagram_ServiceLayerSaveAndRetrieveWorks() {
        Loan loan = new Loan("Personal Loan", 5000.0, 7.0, 12);
        service.saveLoan(loan);
        List<Loan> fetched = service.getAllLoans();
        assertThat(fetched.stream().anyMatch(l -> "Personal Loan".equals(l.getLoanName()))).isTrue();
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_GetLoansReturnsEmptyListWhenNoneExist() throws Exception {
        repository.deleteAll();
        mockMvc.perform(get("/api/loans"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_TestCRUDAPIsvalidateheadersparamsJSONresponses() throws Exception {
        mockMvc.perform(get("/api/loans")
                        .header("Accept", "application/json"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_RepaymentPlanDefaultSortByPrincipal() throws Exception {
        repository.save(new Loan("Loan A", 3000, 4.0, 12));
        repository.save(new Loan("Loan B", 1000, 6.0, 12));

        mockMvc.perform(get("/api/loans/repayment?method=snowball"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].loanName").value("Loan B"));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_RepaymentPlanSortByInterestAvalancheMethod() throws Exception {
        repository.save(new Loan("Loan X", 1000, 9.0, 12));
        repository.save(new Loan("Loan Y", 2000, 12.0, 12));

        mockMvc.perform(get("/api/loans/repayment?method=avalanche"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].interestRate").value(12.0));
    }

    @Test
    public void SpringBoot_DevelopCoreAPIsAndBusinessLogic_DeleteLoanSuccessfully() throws Exception {
        Long id = testLoan.getId();
        mockMvc.perform(delete("/api/loans/" + id))
                .andExpect(status().isOk());
        assertThat(repository.findById(id)).isEmpty();
    }
}
