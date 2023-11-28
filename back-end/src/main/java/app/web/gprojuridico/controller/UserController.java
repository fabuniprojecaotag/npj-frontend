package app.web.gprojuridico.controller;


import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.model.User;
import app.web.gprojuridico.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/create")
    public String create(@RequestBody User user ) throws ExecutionException, InterruptedException {
        return userService.create(user);
    }
    @PostMapping("/filter")
    public String filterUsers(@RequestBody User user ) throws ExecutionException, InterruptedException {
        return userService.getAllUsers(user.getNome()).toString();
    }
    @GetMapping("/all")
    public List<User> getAllUsers() {
        List<User> ls = userService.getAllUsers();
        System.out.println("List size: " + ls.size());
        return ls;
    }
    @DeleteMapping ("/delete/{docId}")
    public ResponseEntity<String> delete(@PathVariable String docId) {
         userService.deleteUserById(docId);
        return ResponseEntity.ok("User deleted successfully");
    }
    @PutMapping ("/toggleStatus/{docId}")
    public ResponseEntity<ResponseModel> toggleqStatus(@PathVariable String docId) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(userService.toggleUserStatus(docId));
    }
}

