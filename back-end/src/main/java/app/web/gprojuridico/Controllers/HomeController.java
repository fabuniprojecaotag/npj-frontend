package app.web.gprojuridico.Controllers;
import app.web.gprojuridico.Models.Credentials;
import app.web.gprojuridico.Models.User;
import app.web.gprojuridico.Security.UserAuthenticationProvider;
import app.web.gprojuridico.Services.UserService;
import org.springframework.core.SpringVersion;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<User> verifyLogin(@AuthenticationPrincipal User user){
        user.setToken(userAuthenticationProvider.createToken(user.getEmail()));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<User> logout(@AuthenticationPrincipal User user){
        SecurityContextHolder.clearContext();
        return ResponseEntity.noContent().build();
    }

}