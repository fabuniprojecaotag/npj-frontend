package app.web.gprojuridico.model.user;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.Map;

@Data
public class Perfil implements GrantedAuthority {
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

    @Override
    public String toString() {
        return "Perfil{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", permissoes=" + permissoes +
                '}';
    }

    @Override
    public String getAuthority() {
        return nome;
    }
}
