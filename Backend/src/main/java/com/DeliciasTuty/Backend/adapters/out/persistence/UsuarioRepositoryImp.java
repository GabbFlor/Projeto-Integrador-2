package com.DeliciasTuty.Backend.adapters.out.persistence;

import com.DeliciasTuty.Backend.application.domain.Usuario;
import com.DeliciasTuty.Backend.application.ports.out.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UsuarioRepositoryImp implements UsuarioRepository {
    @Autowired
    UsuarioJpaRepository jpaRepository;

    @Override
    public Usuario save(Usuario usuario) {
        // transforma o domain em entity, e transforma o retorno do jpa (entity) em domain para voltar na função
        return toDomain(jpaRepository.save(toEntity(usuario)));
    }


    // passando informações do obj de dominio para o de entidade
    private Usuario toDomain(UsuarioEntity entity) {
        Usuario usuario = new Usuario();
        usuario.setNome(entity.getNome());
        usuario.setEmail(entity.getEmail());
        usuario.setSenha(entity.getSenha());
        usuario.setEstado(entity.getEstado());
        usuario.setCidade(entity.getCidade());
        usuario.setGenero(entity.getGenero());
        usuario.setCpf(entity.getCpf());
        usuario.setTell(entity.getTell());

        // if para evitar nullPointerException
        if (entity.getCriado_em() != null) {
            usuario.setCriado_em(String.valueOf(entity.getCriado_em()));
        }

        return usuario;
    }

    private UsuarioEntity toEntity(Usuario usuario) {
        UsuarioEntity entity = new UsuarioEntity();
        entity.setNome(usuario.getNome());
        entity.setEmail(usuario.getEmail());
        entity.setSenha(usuario.getSenha());
        entity.setEstado(usuario.getEstado());
        entity.setCidade(usuario.getCidade());
        entity.setGenero(usuario.getGenero());
        entity.setCpf(usuario.getCpf());
        entity.setTell(usuario.getTell());

        // nesse if tem q colocar o try e tratar a exceção para evitar de travar a API por conta dela
        if(usuario.getCriado_em() != null && !usuario.getCriado_em().isEmpty()) {
            try {
                entity.setCriado_em(LocalDateTime.parse(usuario.getCriado_em()));
            } catch (Exception e) {
                System.err.println("Erro ao adicionar data no banco de dados: " + e.getMessage());
                entity.setCriado_em(null);
            }
        }

        return entity;
    }
}
