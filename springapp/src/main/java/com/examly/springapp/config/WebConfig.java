// package com.examly.springapp.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebConfig {

//     @Bean
//         public WebMvcConfigurer corsConfigurer() {
//                 return new WebMvcConfigurer() {
//     @Override
//          public void addCorsMappings(CorsRegistry registry) {
//              registry.addMapping("/**")
//                       .allowedOrigins( "http://localhost:8081")
//                       .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                         .allowedHeaders("*");
//           }
//     };
//  }
// }

package com.examly.springapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:3000",   // React dev
                                "http://localhost:8080",   // Swagger (if served from backend)
                                "http://localhost:8081",   // optional if you use 8081
                                "https://8081-bfdcedafeffddeabbfdebdedafebdbfcbadaad.premiumproject.examly.io"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
