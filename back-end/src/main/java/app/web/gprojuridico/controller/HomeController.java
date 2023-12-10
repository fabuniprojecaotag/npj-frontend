package app.web.gprojuridico.controller;
import app.web.gprojuridico.model.ResponseModel;
import app.web.gprojuridico.model.User;
import app.web.gprojuridico.security.UserAuthenticationProvider;
import app.web.gprojuridico.service.UserService;
import org.springframework.core.SpringVersion;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class HomeController {

    private final long startTime = System.currentTimeMillis();
    private final UserAuthenticationProvider userAuthenticationProvider;

    public HomeController(UserService userService,
                                    UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationProvider = userAuthenticationProvider;
    }




    @GetMapping("/")
    public String home() {
        long currentTime = System.currentTimeMillis();
        long uptimeInSeconds = (currentTime - startTime) / 1000;

        return "API is running.\nUptime: " + uptimeInSeconds + " seconds\nSpring Version:"+SpringVersion.getVersion();
    }

    @PostMapping("/auth")
    public ResponseModel<Object> verifyLogin(@AuthenticationPrincipal User user) {
        user.setToken(userAuthenticationProvider.createToken(user.getEmail()));

        // Use Collections.singletonList to wrap the user in a list
        List<Object> resultList = Collections.singletonList(user);

        return ResponseModel.success("Users retrieved successfully", resultList);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/logout")
    public ResponseEntity<User> logout(@AuthenticationPrincipal User user){
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/running")
    public ResponseEntity<String> running(){
        String responseBody = "I'm running";
        return ResponseEntity.ok(responseBody);
    }

}
