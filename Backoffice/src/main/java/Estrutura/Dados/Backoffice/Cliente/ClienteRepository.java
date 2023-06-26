package Estrutura.Dados.Backoffice.Cliente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Estrutura.Dados.Backoffice.Produto.Produto;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
	 List<Cliente> findByEmail(String email); 
}

