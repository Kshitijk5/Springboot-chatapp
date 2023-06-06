package com.chatroomserver.chatroonbackend.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
    private String senderName;

    private String receiverName;

    private String message;

    private String media;

    private Status status;
    private String mediaType;

}