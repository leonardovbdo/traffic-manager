package com.leonardovbdo.traffic_manager_api.infra.cors;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuração para permitir CORS (Cross-Origin Resource Sharing) no aplicativo.
 * Permite requisições de origens específicas (neste caso, http://localhost:4200) e métodos HTTP permitidos.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200") // Permite requisições somente de http://localhost:4200
                .allowedMethods("GET", "POST", "DELETE", "PUT"); // Permite os métodos GET, POST, DELETE, PUT
    }
}
