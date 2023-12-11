package app.web.gprojuridico.controller;

import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.model.User;
import app.web.gprojuridico.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/create")
    public ResponseEntity<ResponseModel<?>> create(@RequestBody User user) throws ExecutionException, InterruptedException {
        ResponseModel<?> response = userService.create(user);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/filter")
    public ResponseEntity<String> filterUsers(@RequestBody User user) throws ExecutionException, InterruptedException {
        List<User> filteredUsers = userService.getAllUsers(user.getNome());
        return ResponseEntity.ok(filteredUsers.toString());
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseModel<?>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        System.out.println("List size: " + users.size());

        // Use Collections.singletonList to wrap the list of users
        List<Object> resultList = Collections.singletonList(users);

        ResponseModel<Object> response = ResponseModel.success("Users retrieved successfully", resultList);
        System.out.println("List size: " + response);

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
