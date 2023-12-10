package app.web.gprojuridico.model;

import java.util.List;
import java.util.Map;

public class Perfil {
    private int id;
    private String nome;

    private String documentId;
    private List<Map<String, Object>> permissoes;

    public Perfil() { } // Default constructor for Firestore deserialization

    public Perfil(int id, String nome, List<Map<String, Object>> permissoes) {
        this.id = id;
        this.nome = nome;
        this.permissoes = permissoes;
    }

    // Getter and setter methods
    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Map<String, Object>> getPermissoes() {
        return permissoes;
    }

    public void setPermissoes(List<Map<String, Object>> permissoes) {
        this.permissoes = permissoes;
    }

    @Override
    public String toString() {
        return "Perfil{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", permissoes=" + permissoes +
                '}';
    }
}
