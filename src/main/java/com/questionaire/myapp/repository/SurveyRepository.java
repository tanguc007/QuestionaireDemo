package com.questionaire.myapp.repository;
import com.questionaire.myapp.domain.Survey;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Survey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {

}
