package app.web.gprojuridico;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;

@SpringBootApplication
@RestController
public class GprojuridicoApplication {

	public static void main(String[] args) {
		SpringApplication.run(GprojuridicoApplication.class, args);
	}

	@GetMapping
	public String hello(){
		return "Service is On, Started at "+ ZonedDateTime.now();
	}

}
