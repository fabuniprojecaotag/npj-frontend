package app.web.gprojuridico.security;

import app.web.gprojuridico.model.Credentials;
import app.web.gprojuridico.model.User.User;
import app.web.gprojuridico.service.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.api.client.util.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.concurrent.ExecutionException;

@Component
public class UserAuthenticationProvider {
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

    public String createToken(String login) {
        Algorithm algoritmo = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withIssuer(login)
                .withIssuedAt(new Date())
                .withExpiresAt(genExpirationDate())
                .sign(algoritmo);
    }

    public Authentication validateToken(String token) {

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm).build();

        DecodedJWT decoded = verifier.verify(token);

        User user = userService.findUserByEmail(decoded.getIssuer());
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());


    }

    public Authentication validateCredentials(Credentials credentials) throws ExecutionException, InterruptedException {
        User user = userService.findUserByEmailAndPassword(credentials);
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(6).toInstant(ZoneOffset.of("-03:00"));
    }
}