package app.web.gprojuridico.model;

public class ResponseModel {
    private boolean success;
    private String message;
    private Object result;

    public ResponseModel(boolean success, String message, Object result) {
        this.success = success;
        this.message = message;
        this.result = result;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Object getResult() {
        return result;
    }

    public static ResponseModel success(String message, Object result) {
        return new ResponseModel(true, message, result);
    }

    public static ResponseModel failure(String message, Object result) {
        return new ResponseModel(false, message, result);
    }
}