package app.web.gprojuridico.model;

import java.util.Date;

public class Assistido {


    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private String naturalidade;
    private String nacionalidade;
    private String dataNascimento;
    private String estadoCivil;
    private String telefone;
    private String cidade;
    private String cep;
    private String enderecoResidencial;
    private String escolaridade;
    private String nomePai;
    private String nomeMae;
    private String profissao;
    private String remuneracao;
    private String cidadeComercial;
    private String enderecoComercial;
    private String numDependentes;

    private String documentId;

    // Construtor
    public Assistido(String nome, String email, String cpf, String rg, String naturalidade,
                  String nacionalidade, String dataNascimento, String estadoCivil,
                  String telefone, String cidade, String cep, String enderecoResidencial,
                  String escolaridade, String nomePai, String nomeMae, String profissao,
                  String remuneracao, String cidadeComercial, String enderecoComercial,
                  String numDependentes, String documentId) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.rg = rg;
        this.naturalidade = naturalidade;
        this.nacionalidade = nacionalidade;
        this.dataNascimento = dataNascimento;
        this.estadoCivil = estadoCivil;
        this.telefone = telefone;
        this.cidade = cidade;
        this.cep = cep;
        this.enderecoResidencial = enderecoResidencial;
        this.escolaridade = escolaridade;
        this.nomePai = nomePai;
        this.nomeMae = nomeMae;
        this.profissao = profissao;
        this.remuneracao = remuneracao;
        this.cidadeComercial = cidadeComercial;
        this.enderecoComercial = enderecoComercial;
        this.numDependentes = numDependentes;
        this.documentId = documentId;
    }
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getNaturalidade() {
        return naturalidade;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEnderecoResidencial() {
        return enderecoResidencial;
    }

    public void setEnderecoResidencial(String enderecoResidencial) {
        this.enderecoResidencial = enderecoResidencial;
    }

    public String getEscolaridade() {
        return escolaridade;
    }

    public void setEscolaridade(String escolaridade) {
        this.escolaridade = escolaridade;
    }

    public String getNomePai() {
        return nomePai;
    }

    public void setNomePai(String nomePai) {
        this.nomePai = nomePai;
    }

    public String getNomeMae() {
        return nomeMae;
    }

    public void setNomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public String getRemuneracao() {
        return remuneracao;
    }

    public void setRemuneracao(String remuneracao) {
        this.remuneracao = remuneracao;
    }

    public String getCidadeComercial() {
        return cidadeComercial;
    }

    public void setCidadeComercial(String cidadeComercial) {
        this.cidadeComercial = cidadeComercial;
    }

    public String getEnderecoComercial() {
        return enderecoComercial;
    }

    public void setEnderecoComercial(String enderecoComercial) {
        this.enderecoComercial = enderecoComercial;
    }

    public String getNumDependentes() {
        return numDependentes;
    }

    public void setNumDependentes(String numDependentes) {
        this.numDependentes = numDependentes;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }
}

