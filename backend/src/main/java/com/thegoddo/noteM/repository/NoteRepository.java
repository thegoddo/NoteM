package com.thegoddo.noteM.repository;

import com.thegoddo.noteM.entity.Note;
import com.thegoddo.noteM.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
        List<Note> findByUser(User user);
        Optional<Note> findByIdAndUser(Long id, User user);

    @Query("SELECT n FROM Note n WHERE n.user.id = :userId AND " +
            "(LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(CAST(n.content as text)) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Note> searchByUserAndQuery(@Param("userId") Long userId, @Param("query") String query);
}
