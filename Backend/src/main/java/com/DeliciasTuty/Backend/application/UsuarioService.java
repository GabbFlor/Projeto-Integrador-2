package com.DeliciasTuty.Backend.application;

import com.DeliciasTuty.Backend.application.domain.Usuario;
import com.DeliciasTuty.Backend.application.ports.in.UsuarioUseCase;
import com.DeliciasTuty.Backend.application.ports.out.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UsuarioUseCase {
    @Autowired
    UsuarioRepository repository;

    @Override
    public Usuario postUsuario(Usuario usuario) {
        // todo -> Adicionar uma lógica para encriptar a senha aqui depois

        return repository.save(usuario);
    }
}
