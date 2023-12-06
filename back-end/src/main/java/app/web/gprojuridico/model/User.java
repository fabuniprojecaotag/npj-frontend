package app.web.gprojuridico.model;

public class User {

    private int id;
    private String email;
    private String senha;

    private String matricula;

    private Perfil perfil;

    private String perfil_id;

    private String nome;
    private String documentId;

    private String token;

    User() {

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public Perfil getPerfil() {
        return perfil;
    }

    public void setPerfil(Perfil perfil) {
        this.perfil = perfil;
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getPerfil_id() {
        return perfil_id;
    }

    public void setPerfil_id(String perfil_id) {
        this.perfil_id = perfil_id;
    }

    @Override
    public String toString() {
        return "User{" +
                "documentId='" + documentId + '\'' +
                ", nome='" + nome + '\'' +
                // ... include other fields as needed
                '}';
    }

}
