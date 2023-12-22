package app.web.gprojuridico.security;

import app.web.gprojuridico.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import org.springframework.http.HttpHeaders;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;
    @Autowired
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("JWT FILTER AC");
        var token = this.recoverToken(request);
        if(token != null){
            var email = tokenService.validateToken(token);
            UserDetails user = userService.findUserByEmail(email);

            var autenticacao = new UsernamePasswordAuthenticationToken(user, null);
            SecurityContextHolder.getContext().setAuthentication(autenticacao);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        System.out.println("Authorization Header: " + authHeader);
        if (authHeader == null || authHeader.isEmpty() || !authHeader.startsWith("Bearer") ) {
            return null;
        } else {
            System.out.println("Token recuperado!");
            return  authHeader.replace("Bearer", "");
        }
    }
}

