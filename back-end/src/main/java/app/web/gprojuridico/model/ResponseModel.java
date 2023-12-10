package app.web.gprojuridico.model;

import java.util.List;

public class ResponseModel<T> {
    private boolean success;
    private String message;
    private List<T> result; // Change the type to List<T>

    public ResponseModel(boolean success, String message, List<T> result) {
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

    public List<T> getResult() {
        return result;
    }

    public static <T> ResponseModel<T> success(String message, List<T> result) {
        return new ResponseModel<>(true, message, result);
    }

    public static <T> ResponseModel<T> failure(String message, List<T> result) {
        return new ResponseModel<>(false, message, result);
    }
}
