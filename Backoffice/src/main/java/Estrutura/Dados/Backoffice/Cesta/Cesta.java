package Estrutura.Dados.Backoffice.Cesta;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Cestas")
public class Cesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idCliente;
    private Long idProduto;

    @Column(name = "data_hora")
    private LocalDateTime dataHora;

    public Cesta() {
        this.dataHora = LocalDateTime.now();
    }

    public Cesta(Long Cliente, Long Produto) {
        this.idCliente = Cliente;
        this.idProduto = Produto;
        this.dataHora = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long Cliente) {
        this.idCliente = Cliente;
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Long Produto) {
        this.idProduto = Produto;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
}
