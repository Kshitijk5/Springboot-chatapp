package com.chatroomserver.chatroonbackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();

    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
       registry.setApplicationDestinationPrefixes("/app");
       registry.enableSimpleBroker("/chatroom","/user");
       registry.setUserDestinationPrefix("/user");


    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
        registry.setSendTimeLimit(60 * 1000)
                .setSendBufferSizeLimit(50 * 1024 * 1024)
                .setMessageSizeLimit(50 * 1024 * 1024);
    }
}
