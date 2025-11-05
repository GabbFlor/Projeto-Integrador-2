package com.DeliciasTuty.Backend.adapters.in.web;

import com.DeliciasTuty.Backend.application.DTOs.PostUsuarioDTO;
import com.DeliciasTuty.Backend.application.domain.Usuario;
import com.DeliciasTuty.Backend.application.ports.in.UsuarioUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UsuarioController {
    @Autowired
    UsuarioUseCase useCase;

    @PostMapping
    public ResponseEntity<?> salvarUsuario(@RequestBody PostUsuarioDTO bodyDTO) {
        try {
            // passando as informações do obj do DTO para o domain
            Usuario usuario = new Usuario();
            usuario.setNome(bodyDTO.nome());
            usuario.setEmail(bodyDTO.email());
            usuario.setSenha(bodyDTO.senha());
            usuario.setEstado(bodyDTO.estado());
            usuario.setCidade(bodyDTO.cidade());
            usuario.setGenero(bodyDTO.genero());
            usuario.setCpf(bodyDTO.cpf());
            usuario.setTell(bodyDTO.tell());

            // envia o objeto para a porta de entrada
            useCase.postUsuario(usuario);

            Map<String, String> response = gerarMsgDeRetorno("Mensagem", "Usuáro criado com sucesso!");

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            Map<String, String> response = gerarMsgDeRetorno("Erro", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // função para criar body de retorno (deixa o código nas entradas mais enxuto)
    private Map<String, String> gerarMsgDeRetorno(String chave, String valor) {
        Map<String, String> msg = Map.of(
                chave, valor
        );

        return msg;
    }
}
