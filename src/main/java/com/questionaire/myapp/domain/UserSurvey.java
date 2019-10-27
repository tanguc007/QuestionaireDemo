package com.questionaire.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A UserSurvey.
 */
@Entity
@Table(name = "user_survey")
public class UserSurvey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Applicant user;

    @OneToOne
    @JoinColumn(unique = true)
    private Survey survey;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Applicant getUser() {
        return user;
    }

    public UserSurvey user(Applicant applicant) {
        this.user = applicant;
        return this;
    }

    public void setUser(Applicant applicant) {
        this.user = applicant;
    }

    public Survey getSurvey() {
        return survey;
    }

    public UserSurvey survey(Survey survey) {
        this.survey = survey;
        return this;
    }

    public void setSurvey(Survey survey) {
        this.survey = survey;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserSurvey)) {
            return false;
        }
        return id != null && id.equals(((UserSurvey) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserSurvey{" +
            "id=" + getId() +
            "}";
    }
}
