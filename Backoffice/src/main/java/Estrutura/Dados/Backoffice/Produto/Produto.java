package Estrutura.Dados.Backoffice.Produto;

import javax.persistence.*;


@Entity
@Table(name = "Produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeLivro;
    @Column(columnDefinition = "VARCHAR(4000)")
    private String descricao;
    private String autor;
    private Float valor;

    // Construtores
    
    public Produto() {
    }

    public Produto(String nomeLivro, String descricao, String autor, Float valor) {
        this.nomeLivro = nomeLivro;
        this.descricao = descricao;
        this.autor = autor;
        this.valor = valor;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeLivro() {
        return nomeLivro;
    }

    public void setNomeLivro(String nomeLivro) {
        this.nomeLivro = nomeLivro;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public Float getValor() {
        return valor;
    }

    public void setValor(Float valor) {
        this.valor = valor;
    }
}

