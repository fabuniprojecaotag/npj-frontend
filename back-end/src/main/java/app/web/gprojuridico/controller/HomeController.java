package app.web.gprojuridico.controller;

import app.web.gprojuridico.service.UserService;
import org.springframework.core.SpringVersion;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class HomeController {

    private final long startTime = System.currentTimeMillis();

    public HomeController() {
    }

    @GetMapping("/")
    public String home() {
        long currentTime = System.currentTimeMillis();
        long uptimeInSeconds = (currentTime - startTime) / 1000;

        return "API is running.\nUptime: " + uptimeInSeconds + " seconds\nSpring Version:" + SpringVersion.getVersion();
    }

    @GetMapping("/running")
    public ResponseEntity<String> running() {
        String responseBody = "I'm running";
        return ResponseEntity.ok(responseBody);
    }

}
