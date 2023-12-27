package app.web.gprojuridico.security;

import app.web.gprojuridico.model.user.AuthenticationDTO;
import app.web.gprojuridico.model.user.User;
import app.web.gprojuridico.service.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.google.api.client.util.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.concurrent.ExecutionException;

@Service
public class TokenService {
    @Value("${security.jwt.token.secret-key:secret-key}")
    //Não esta pegando o valor do application.properties
    //TODO:Trocar secret para algum enconding/chave privada openssl
    private String secretKey = "my-secret-key";

    @Autowired
    UserService userService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String generateToken(User user) {
        Algorithm algoritmo = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(user.getEmail())
                .withIssuer("NPJ-Api")
                .withIssuedAt(new Date())
                .withExpiresAt(genExpirationDate())
                .sign(algoritmo);
    }

    public String validateToken(String token) {
        try{
            Algorithm algoritmo = Algorithm.HMAC256(secretKey);

            return JWT.require(algoritmo)
                    .withIssuer("NPJ-Api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Erro ao validar Token:" + exception);
        }
    }

    public Authentication validateCredentials(AuthenticationDTO credentials) throws ExecutionException, InterruptedException {
        User user = userService.findUserByEmailAndPassword(credentials);
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(6).toInstant(ZoneOffset.of("-03:00"));
    }
}