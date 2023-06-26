package Estrutura.Dados.Backoffice.Produto;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByNomeLivroContainingIgnoreCase(String nomeLivro);
    List<Produto> findByAutorContainingIgnoreCase(String autor);

}
