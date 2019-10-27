package com.questionaire.myapp.domain;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Survey.
 */
@Entity
@Table(name = "survey")
public class Survey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "text")
    private String text;

    /**
     * A relationship
     */
    @ApiModelProperty(value = "A relationship")
    @OneToMany(mappedBy = "survey")
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Survey text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Survey questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Survey addQuestions(Question question) {
        this.questions.add(question);
        question.setSurvey(this);
        return this;
    }

    public Survey removeQuestions(Question question) {
        this.questions.remove(question);
        question.setSurvey(null);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Survey)) {
            return false;
        }
        return id != null && id.equals(((Survey) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Survey{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
