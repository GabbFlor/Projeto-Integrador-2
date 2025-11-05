package com.DeliciasTuty.Backend.application.ports.out;

import com.DeliciasTuty.Backend.application.domain.Usuario;

public interface UsuarioRepository {
    Usuario save(Usuario usuario);
}
