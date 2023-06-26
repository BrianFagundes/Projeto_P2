package Estrutura.Dados.Backoffice.Cesta;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CestaRepository extends JpaRepository<Cesta, Long> {
    List<Cesta> findByIdCliente(Long idCliente);
}

