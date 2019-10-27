package com.questionaire.myapp.repository;
import com.questionaire.myapp.domain.UserSurvey;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserSurvey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSurveyRepository extends JpaRepository<UserSurvey, Long> {

}
