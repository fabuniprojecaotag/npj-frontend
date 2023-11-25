package app.web.gprojuridico.model;

import org.apache.naming.factory.SendMailFactory;


public class User {

    private int id;
    private String email;
    private String senha;

    private String matricula;
    private String nome;

    private String documentId;

    @Override
    public String toString() {
        return "User{" +
                "documentId='" + documentId + '\'' +
                ", nome='" + nome + '\'' +
                // ... include other fields as needed
                '}';
    }
    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    private String token;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getPerfil_id() {
        return perfil_id;
    }

    public void setPerfil_id(int perfil_id) {
        this.perfil_id = perfil_id;
    }

    private int  perfil_id;

    User(){

    }


    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
