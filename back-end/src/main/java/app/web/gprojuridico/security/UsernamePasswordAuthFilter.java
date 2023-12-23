package app.web.gprojuridico.security;

import app.web.gprojuridico.model.Credentials;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Component
public class UsernamePasswordAuthFilter extends OncePerRequestFilter {
    private static final ObjectMapper MAPPER = new ObjectMapper();
    @Autowired
    TokenService provider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        System.out.println("USERNAME PASS AUTG FUILC ENTRY");

        if ("/auth/login".equals(request.getServletPath()) && HttpMethod.POST.matches(request.getMethod())) {
            Credentials user = MAPPER.readValue(request.getInputStream(), Credentials.class);

            try {
                System.out.println("VALIDANDO");
                SecurityContextHolder.getContext().setAuthentication(
                        provider.validateCredentials(user)
                );
            } catch (RuntimeException e) {
                System.out.println("ERRO DE VALIDAÇAO");

                SecurityContextHolder.clearContext();
                throw e;
            } catch (ExecutionException | InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        filterChain.doFilter(request, response);
    }
}