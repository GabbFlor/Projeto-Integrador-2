package com.DeliciasTuty.Backend.application.DTOs;

import com.DeliciasTuty.Backend.application.ENUMs.GeneroUsuario;

public record PostUsuarioDTO(
        Long id,
        String nome,
        String email,
        String senha,
        String estado,
        String cidade,
        GeneroUsuario genero,
        String cpf,
        String tell
) {
}
