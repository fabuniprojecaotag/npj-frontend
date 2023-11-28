package app.web.gprojuridico.controller;


import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.service.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/perfil")
public class PerfilController {

    @Autowired
    private final PerfilService perfilService;

    public PerfilController(PerfilService perfilService) {
        this.perfilService = perfilService;
    }
    @GetMapping("/all")
    public ResponseModel getAllUsers() {
        ResponseModel data = perfilService.getAll();
        return data;
    }
    @GetMapping("/{perfilId}")
    public ResponseEntity<ResponseModel> getPerfilById(@PathVariable String perfilId) {
        ResponseEntity<ResponseModel> perfilResponse = perfilService.getPerfilById(perfilId);

        if (perfilResponse.getBody() != null) {
            return new ResponseEntity<>(perfilResponse.getBody(), perfilResponse.getStatusCode());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
