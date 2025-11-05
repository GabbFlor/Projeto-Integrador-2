package com.DeliciasTuty.Backend.application.ports.in;

import com.DeliciasTuty.Backend.application.domain.Usuario;

public interface UsuarioUseCase {
    Usuario postUsuario(Usuario usuario);
}
