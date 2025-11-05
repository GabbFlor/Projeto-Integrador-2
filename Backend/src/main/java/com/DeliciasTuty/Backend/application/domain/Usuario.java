package com.DeliciasTuty.Backend.application.domain;

import com.DeliciasTuty.Backend.application.ENUMs.GeneroUsuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Usuario {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String estado;
    private String cidade;
    private GeneroUsuario genero;
    private String cpf;
    private String tell;
    private String criado_em;
}
