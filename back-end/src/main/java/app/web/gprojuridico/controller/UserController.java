package app.web.gprojuridico.controller;

import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.model.User.User;
import app.web.gprojuridico.security.TokenService;
import app.web.gprojuridico.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseModel<Object> verifyLogin(@AuthenticationPrincipal User user) {
        user.setToken(tokenService.generateToken(user.getEmail()));

        // Use Collections.singletonList to wrap the user in a list
        List<Object> resultList = Collections.singletonList(user);

        return ResponseModel.success("Users retrieved successfully", resultList);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/logout")
    public ResponseEntity<User> logout(@AuthenticationPrincipal User user) {
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/create")
    public ResponseEntity<ResponseModel<?>> create(@RequestBody @Valid User user) throws ExecutionException, InterruptedException {
        ResponseModel<?> response = userService.create(user);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/filter")
    public ResponseEntity<String> filterUsers(@RequestBody User user) throws ExecutionException, InterruptedException {
        List<User> filteredUsers = userService.getAllUsers(user.getNome());
        return ResponseEntity.ok(filteredUsers.toString());
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseModel<?>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        System.out.println("Tamanho da lista de usuários: " + users.size());

        // Use Collections.singletonList to wrap the list of users
        List<Object> resultList = Collections.singletonList(users);

        ResponseModel<Object> response = ResponseModel.success("Users retrieved successfully", resultList);
        System.out.println("Lista de usuários: " + response);

        return ResponseEntity.ok(response);
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
