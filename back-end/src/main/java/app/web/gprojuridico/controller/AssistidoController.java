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

    @GetMapping("/get/{assistidoId}")
    public ResponseEntity<ResponseModel<?>> getAssistidoById(@PathVariable String assistidoId) {
        Assistido assistido = assistidoService.getAssistidoById(assistidoId);

        if (assistido != null) {
            return ResponseEntity.ok(ResponseModel.success("Assistido encontrado", Collections.singletonList(assistido)));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseModel.failure("Assistido não encontrado", null));
        }
    }
    @PostMapping("/create")
    public ResponseModel<?> createAssistido(@RequestBody Assistido assistido) {
        return assistidoService.createAssistido(assistido);
    }

    @PutMapping("/update/{assistidoId}")
    public ResponseModel<?> updateAssistido(@PathVariable String assistidoId, @RequestBody Assistido assistido) {
        return assistidoService.updateAssistido(assistidoId, assistido);
    }

    @DeleteMapping("/delete/{assistidoId}")
    public ResponseModel<?> deleteAssistido(@PathVariable String assistidoId) {
        return assistidoService.deleteAssistido(assistidoId);
    }





}
