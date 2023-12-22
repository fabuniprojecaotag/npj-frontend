package app.web.gprojuridico.config;

import app.web.gprojuridico.security.JWTAuthFilter;
import app.web.gprojuridico.security.UserAuthenticationEntryPoint;
import app.web.gprojuridico.security.UserAuthenticationProvider;
import app.web.gprojuridico.security.UsernamePasswordAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
//    private final String[] AUTH_WHITE_LIST = {"/auth=", "/auth", "auth/login", "auth/login=", "auth/logout", "auth/logout=", "/"};
//    private final String[] SWAGGER_WHITE_LIST = {"/swagger-ui.html", "/webjars/**", "/swagger-resources",
//            "/swagger-resources/**", "/v2/api-docs", "/configuration/ui", "/configuration/security", "/swagger-ui/**",
//            "/v3/api-docs/**", "/swagger-ui/index.html", "/swagger-ui/index.html/**", "/swagger-ui/**", "/v2/api-docs",
//            "/configuration/ui", "/swagger-resources", "/configuration/security", "/swagger-ui.html", "/webjars/**",
//            "/swagger-resources/configuration/ui", "/swagge‌​r-ui.html",
//            "/swagger-resources/configuration/security"};

    // Create a new array with the calculated length
//    private final String[] WHITE_LIST = Stream.concat(Arrays.stream(AUTH_WHITE_LIST), Arrays.stream(SWAGGER_WHITE_LIST))
//            .toArray(String[]::new);
    @Autowired
    private UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    @Autowired
    private UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .exceptionHandling(e -> e.authenticationEntryPoint(userAuthenticationEntryPoint))
                .addFilterBefore(new UsernamePasswordAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .addFilterBefore(new JWTAuthFilter(userAuthenticationProvider), UsernamePasswordAuthFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.POST, WHITE_LIST).permitAll()
//                        .requestMatchers(HttpMethod.GET, SWAGGER_WHITE_LIST).permitAll()
//                        .anyRequest().authenticated());
                .build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}