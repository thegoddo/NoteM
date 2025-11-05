package com.thegoddo.noteM.entity;
import com.thegoddo.noteM.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.Instant;

@Entity
@Table(name = "notes")
@Data
@NoArgsConstructor
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob // Specifies a Large Object, which maps to TEXT type
    @Column(columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp // Automatically set when created
    private Instant createdAt;

    @UpdateTimestamp // Automatically set when updated
    private Instant updatedAt;

    // A note belongs to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}