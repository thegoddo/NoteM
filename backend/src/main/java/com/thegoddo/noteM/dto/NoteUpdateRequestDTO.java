package com.thegoddo.noteM.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NoteUpdateRequestDTO {

    @NotBlank(message = "Title cannot be blank")
    private String title;

    private String content;
}