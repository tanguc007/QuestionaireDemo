package com.questionaire.myapp.web.rest;

import com.questionaire.myapp.QuestionaireDemoApp;
import com.questionaire.myapp.domain.UserSurvey;
import com.questionaire.myapp.repository.UserSurveyRepository;
import com.questionaire.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.questionaire.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UserSurveyResource} REST controller.
 */
@SpringBootTest(classes = QuestionaireDemoApp.class)
public class UserSurveyResourceIT {

    @Autowired
    private UserSurveyRepository userSurveyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUserSurveyMockMvc;

    private UserSurvey userSurvey;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserSurveyResource userSurveyResource = new UserSurveyResource(userSurveyRepository);
        this.restUserSurveyMockMvc = MockMvcBuilders.standaloneSetup(userSurveyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSurvey createEntity(EntityManager em) {
        UserSurvey userSurvey = new UserSurvey();
        return userSurvey;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserSurvey createUpdatedEntity(EntityManager em) {
        UserSurvey userSurvey = new UserSurvey();
        return userSurvey;
    }

    @BeforeEach
    public void initTest() {
        userSurvey = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserSurvey() throws Exception {
        int databaseSizeBeforeCreate = userSurveyRepository.findAll().size();

        // Create the UserSurvey
        restUserSurveyMockMvc.perform(post("/api/user-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSurvey)))
            .andExpect(status().isCreated());

        // Validate the UserSurvey in the database
        List<UserSurvey> userSurveyList = userSurveyRepository.findAll();
        assertThat(userSurveyList).hasSize(databaseSizeBeforeCreate + 1);
        UserSurvey testUserSurvey = userSurveyList.get(userSurveyList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserSurveyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userSurveyRepository.findAll().size();

        // Create the UserSurvey with an existing ID
        userSurvey.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserSurveyMockMvc.perform(post("/api/user-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSurvey)))
            .andExpect(status().isBadRequest());

        // Validate the UserSurvey in the database
        List<UserSurvey> userSurveyList = userSurveyRepository.findAll();
        assertThat(userSurveyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserSurveys() throws Exception {
        // Initialize the database
        userSurveyRepository.saveAndFlush(userSurvey);

        // Get all the userSurveyList
        restUserSurveyMockMvc.perform(get("/api/user-surveys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userSurvey.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getUserSurvey() throws Exception {
        // Initialize the database
        userSurveyRepository.saveAndFlush(userSurvey);

        // Get the userSurvey
        restUserSurveyMockMvc.perform(get("/api/user-surveys/{id}", userSurvey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userSurvey.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserSurvey() throws Exception {
        // Get the userSurvey
        restUserSurveyMockMvc.perform(get("/api/user-surveys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserSurvey() throws Exception {
        // Initialize the database
        userSurveyRepository.saveAndFlush(userSurvey);

        int databaseSizeBeforeUpdate = userSurveyRepository.findAll().size();

        // Update the userSurvey
        UserSurvey updatedUserSurvey = userSurveyRepository.findById(userSurvey.getId()).get();
        // Disconnect from session so that the updates on updatedUserSurvey are not directly saved in db
        em.detach(updatedUserSurvey);

        restUserSurveyMockMvc.perform(put("/api/user-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserSurvey)))
            .andExpect(status().isOk());

        // Validate the UserSurvey in the database
        List<UserSurvey> userSurveyList = userSurveyRepository.findAll();
        assertThat(userSurveyList).hasSize(databaseSizeBeforeUpdate);
        UserSurvey testUserSurvey = userSurveyList.get(userSurveyList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserSurvey() throws Exception {
        int databaseSizeBeforeUpdate = userSurveyRepository.findAll().size();

        // Create the UserSurvey

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserSurveyMockMvc.perform(put("/api/user-surveys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userSurvey)))
            .andExpect(status().isBadRequest());

        // Validate the UserSurvey in the database
        List<UserSurvey> userSurveyList = userSurveyRepository.findAll();
        assertThat(userSurveyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserSurvey() throws Exception {
        // Initialize the database
        userSurveyRepository.saveAndFlush(userSurvey);

        int databaseSizeBeforeDelete = userSurveyRepository.findAll().size();

        // Delete the userSurvey
        restUserSurveyMockMvc.perform(delete("/api/user-surveys/{id}", userSurvey.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserSurvey> userSurveyList = userSurveyRepository.findAll();
        assertThat(userSurveyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserSurvey.class);
        UserSurvey userSurvey1 = new UserSurvey();
        userSurvey1.setId(1L);
        UserSurvey userSurvey2 = new UserSurvey();
        userSurvey2.setId(userSurvey1.getId());
        assertThat(userSurvey1).isEqualTo(userSurvey2);
        userSurvey2.setId(2L);
        assertThat(userSurvey1).isNotEqualTo(userSurvey2);
        userSurvey1.setId(null);
        assertThat(userSurvey1).isNotEqualTo(userSurvey2);
    }
}
