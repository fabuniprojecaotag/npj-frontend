package app.web.gprojuridico.model;

import com.google.gson.JsonObject;

public class ResponseModel {
    private boolean success;
    private String message;
    private Object data;

    public ResponseModel(boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }

    public static ResponseModel success(String message, Object data) {
        return new ResponseModel(true, message, data);
    }

    public static ResponseModel failure(String message, Object data) {
        return new ResponseModel(false, message, data);
    }
}
