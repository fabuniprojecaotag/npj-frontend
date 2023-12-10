package app.web.gprojuridico.security;

import app.web.gprojuridico.model.Credentials;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class UsernamePasswordAuthFilter extends OncePerRequestFilter {
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private final UserAuthenticationProvider provider;
    public UsernamePasswordAuthFilter(UserAuthenticationProvider provider){
        this.provider=provider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException{
        System.out.println("USERNAME PASS AUTG FUILC ENTRY");

        if("/auth".equals(request.getServletPath()) && HttpMethod.POST.matches(request.getMethod())){
           Credentials user = MAPPER.readValue(request.getInputStream(),Credentials.class);

            try{
                System.out.println("VALIDANDO");

                SecurityContextHolder.getContext().setAuthentication(
                        provider.validateCredentials(user)
                );
            }catch(RuntimeException e){
                System.out.println("ERROR VALIDAÇOA");

                SecurityContextHolder.clearContext();
                throw e;
            } catch (ExecutionException | InterruptedException e) {
                throw new RuntimeException(e);
            }
        }

        filterChain.doFilter(request,response);
    }
}
