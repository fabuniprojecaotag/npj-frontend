package app.web.gprojuridico.controller;

import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.model.User.AuthenticationDTO;
import app.web.gprojuridico.model.User.LoginResponseDTO;
import app.web.gprojuridico.model.User.User;
import app.web.gprojuridico.security.TokenService;
import app.web.gprojuridico.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> verifyLogin(@RequestBody @Valid AuthenticationDTO user) throws ExecutionException, InterruptedException {
        User userFound = userService.findUserByEmailAndPassword(user);
        String access_token = tokenService.generateToken(userFound);

        return ResponseEntity.ok(new LoginResponseDTO(access_token, userFound));
    }

    @PostMapping("/register")
    public ResponseEntity<User> create(@RequestBody @Valid User data) throws ExecutionException, InterruptedException {
        if (this.userService.findUserByEmail(data.getEmail()) != null) {
            return ResponseEntity.badRequest().build();
        }

        userService.create(data);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/filter")
    public ResponseEntity<String> filterUsers(@RequestBody User user) throws ExecutionException, InterruptedException {
        List<User> filteredUsers = userService.getAllUsers(user.getNome());
        return ResponseEntity.ok(filteredUsers.toString());
    }

    @GetMapping("/list")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        System.out.println("Tamanho da lista de usuários: " + users.size());
        System.out.println("Lista de usuários: " + users);

        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{usuarioId}")
    public ResponseEntity<ResponseModel<?>> getAssistidoById(@PathVariable String usuarioId) {
        ResponseModel<User> user = userService.getUserById(usuarioId);

        if (user != null) {
            return ResponseEntity.ok(ResponseModel.success("Usuário encontrado", Collections.singletonList(user)));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseModel.failure("Usuário não encontrado", null));
        }
    }

    @DeleteMapping("/delete/{docId}")
    public ResponseEntity<String> delete(@PathVariable String docId) {
        userService.deleteUserById(docId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/toggleStatus/{docId}")
    public ResponseEntity<ResponseModel> toggleStatus(@PathVariable String docId)
            throws ExecutionException, InterruptedException {
        ResponseModel response = userService.toggleUserStatus(docId);
        return ResponseEntity.ok(response);
    }
}
