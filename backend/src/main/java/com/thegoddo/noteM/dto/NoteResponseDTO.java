package com.thegoddo.noteM.dto;

import com.thegoddo.noteM.entity.Note;
import lombok.Data;
import java.time.Instant;

@Data
public class NoteResponseDTO {
    private Long id;
    private String title;
    private String content;
    private Instant createdAt;
    private Instant updatedAt;
    private Long userId;

    public NoteResponseDTO(Note note) {
        this.id = note.getId();
        this.title = note.getTitle();
        this.content = note.getContent();
        this.createdAt = note.getCreatedAt();
        this.updatedAt = note.getUpdatedAt();
        this.userId = note.getUser().getId();
    }
}