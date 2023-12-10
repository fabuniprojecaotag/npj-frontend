package app.web.gprojuridico.controller;

import app.web.gprojuridico.model.Assistido;
import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.service.AssistidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/assistido")
public class AssistidoController {

    @Autowired
    private final AssistidoService assistidoService;

    public AssistidoController(AssistidoService assistidoService) {
        this.assistidoService = assistidoService;
    }

    @GetMapping("/all")
    public ResponseModel<?> getAllAssistidos() {
        return (ResponseModel<?>) assistidoService.getAllAssistidos();
    }

    @PostMapping("/create")
    public ResponseModel<?> createAssistido(@RequestBody Assistido assistido) {
        return assistidoService.createAssistido(assistido);
    }

//    @GetMapping("/{assistidoId}")
//    public ResponseEntity<ResponseModel<?>> getAssistidoById(@PathVariable String assistidoId) {
//        ResponseEntity<ResponseModel> assistidoResponse = assistidoService.getAssistidoById(assistidoId);
//
//        if (assistidoResponse.getBody() != null) {
//            return new ResponseEntity<>(assistidoResponse.getBody(), assistidoResponse.getStatusCode());
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    // Adicione métodos para criar, editar e deletar assistidos conforme necessário

}
