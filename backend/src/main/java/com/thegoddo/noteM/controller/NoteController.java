package com.thegoddo.noteM.controller;

import com.thegoddo.noteM.dto.NoteResponseDTO;
import com.thegoddo.noteM.dto.NoteUpdateRequestDTO;
import com.thegoddo.noteM.entity.Note;
import com.thegoddo.noteM.entity.User;
import com.thegoddo.noteM.repository.NoteRepository;
import com.thegoddo.noteM.repository.UserRepository; // 1. Import UserRepository
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    @Autowired
    public NoteController(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser(UserDetails userDetails) {
        return userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
    }

    @GetMapping
    public List<NoteResponseDTO> getAllNotes(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        return noteRepository.findByUser(user).stream()
                .map(NoteResponseDTO::new)
                .collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public ResponseEntity<NoteResponseDTO> getNoteById(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        return noteRepository.findByIdAndUser(id, user)
                .map(note -> ResponseEntity.ok(new NoteResponseDTO(note))) // Convert to DTO
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public NoteResponseDTO createNote(@AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        Note newNote = new Note();
        newNote.setTitle("Untitled Note");
        newNote.setContent("...");
        newNote.setUser(user);
        return new NoteResponseDTO(noteRepository.save(newNote));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponseDTO> updateNote(@PathVariable Long id,
                                                      @Valid @RequestBody NoteUpdateRequestDTO noteDetails,
                                                      @AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        return noteRepository.findByIdAndUser(id, user)
                .map(note -> {
                    note.setTitle(noteDetails.getTitle());
                    note.setContent(noteDetails.getContent());
                    Note updatedNote = noteRepository.save(note);
                    return ResponseEntity.ok(new NoteResponseDTO(updatedNote));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteNote(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        User user = getCurrentUser(userDetails);
        return noteRepository.findByIdAndUser(id, user)
                .map(note -> {
                    noteRepository.delete(note);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/search")
    public List<NoteResponseDTO> searchNotes(@RequestParam("q") String query,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        if (query == null || query.isBlank()) {
            return List.of();
        }

        User user = getCurrentUser(userDetails);

        return noteRepository.searchByUserAndQuery(user.getId(), query).stream()
                .map(NoteResponseDTO::new)
                .collect(Collectors.toList());
    }
}