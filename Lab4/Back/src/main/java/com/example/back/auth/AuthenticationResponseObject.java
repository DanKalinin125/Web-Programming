package com.example.back.auth;

public class AuthenticationResponseObject {
    private String token;
    private String msg;

    public AuthenticationResponseObject(String token) {
        this.token = token;
    }
    public AuthenticationResponseObject(int code, String msg) {
        this.msg = msg;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
