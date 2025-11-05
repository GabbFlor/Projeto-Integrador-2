package com.DeliciasTuty.Backend.adapters.out.persistence;

import com.DeliciasTuty.Backend.application.ENUMs.GeneroUsuario;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Data
@Entity
@Table(name = "usuarios")
public class UsuarioEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nome;

    @Column(nullable = false, length = 75)
    private String email;

    @Column(nullable = false, length = 150)
    private String senha;

    @Column(nullable = false, length = 2)
    private String estado;

    @Column(nullable = false, length = 50)
    private String cidade;

    @Column(nullable = false, length = 15)
    @Enumerated(EnumType.STRING)
    private GeneroUsuario genero;

    @Column(nullable = false, length = 11)
    private String cpf;

    @Column(nullable = false, length = 13)
    private String tell;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime criado_em;
}
