package com.questionaire.myapp.web.rest;

import com.questionaire.myapp.domain.UserSurvey;
import com.questionaire.myapp.repository.UserSurveyRepository;
import com.questionaire.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.questionaire.myapp.domain.UserSurvey}.
 */
@RestController
@RequestMapping("/api")
public class UserSurveyResource {

    private final Logger log = LoggerFactory.getLogger(UserSurveyResource.class);

    private static final String ENTITY_NAME = "userSurvey";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserSurveyRepository userSurveyRepository;

    public UserSurveyResource(UserSurveyRepository userSurveyRepository) {
        this.userSurveyRepository = userSurveyRepository;
    }

    /**
     * {@code POST  /user-surveys} : Create a new userSurvey.
     *
     * @param userSurvey the userSurvey to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userSurvey, or with status {@code 400 (Bad Request)} if the userSurvey has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-surveys")
    public ResponseEntity<UserSurvey> createUserSurvey(@RequestBody UserSurvey userSurvey) throws URISyntaxException {
        log.debug("REST request to save UserSurvey : {}", userSurvey);
        if (userSurvey.getId() != null) {
            throw new BadRequestAlertException("A new userSurvey cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserSurvey result = userSurveyRepository.save(userSurvey);
        return ResponseEntity.created(new URI("/api/user-surveys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-surveys} : Updates an existing userSurvey.
     *
     * @param userSurvey the userSurvey to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userSurvey,
     * or with status {@code 400 (Bad Request)} if the userSurvey is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userSurvey couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-surveys")
    public ResponseEntity<UserSurvey> updateUserSurvey(@RequestBody UserSurvey userSurvey) throws URISyntaxException {
        log.debug("REST request to update UserSurvey : {}", userSurvey);
        if (userSurvey.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserSurvey result = userSurveyRepository.save(userSurvey);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userSurvey.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-surveys} : get all the userSurveys.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userSurveys in body.
     */
    @GetMapping("/user-surveys")
    public List<UserSurvey> getAllUserSurveys() {
        log.debug("REST request to get all UserSurveys");
        return userSurveyRepository.findAll();
    }

    /**
     * {@code GET  /user-surveys/:id} : get the "id" userSurvey.
     *
     * @param id the id of the userSurvey to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userSurvey, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-surveys/{id}")
    public ResponseEntity<UserSurvey> getUserSurvey(@PathVariable Long id) {
        log.debug("REST request to get UserSurvey : {}", id);
        Optional<UserSurvey> userSurvey = userSurveyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userSurvey);
    }

    /**
     * {@code DELETE  /user-surveys/:id} : delete the "id" userSurvey.
     *
     * @param id the id of the userSurvey to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-surveys/{id}")
    public ResponseEntity<Void> deleteUserSurvey(@PathVariable Long id) {
        log.debug("REST request to delete UserSurvey : {}", id);
        userSurveyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
