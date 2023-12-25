package app.web.gprojuridico.config;

import app.web.gprojuridico.security.JWTAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    @Autowired
    JWTAuthFilter jwtAuthFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .exceptionHandling(e -> e.authenticationEntryPoint(userAuthenticationEntryPoint))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/hello", "/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**").permitAll()
                        /* endpoints de usuario */
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // pre-flight
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/filter").permitAll()
                        .requestMatchers(HttpMethod.GET, "/auth/get/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/auth/list").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/delete/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/toggleStatus/**").permitAll()
                        /* endpoints de perfil */
                        .requestMatchers(HttpMethod.GET, "/perfil/all").permitAll()
                        .requestMatchers(HttpMethod.GET, "/perfil/get/**").permitAll()
                        /* endpoints de assistidos */
                        .requestMatchers(HttpMethod.POST, "/assistido/create").permitAll()
                        .requestMatchers(HttpMethod.GET, "/assistido/get/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/assistido/all").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/assistido/update/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/assistido/delete/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}