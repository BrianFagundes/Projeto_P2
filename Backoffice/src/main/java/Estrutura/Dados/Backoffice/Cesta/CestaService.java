package Estrutura.Dados.Backoffice.Cesta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CestaService {

    private final CestaRepository cestaRepository;

    @Autowired
    public CestaService(CestaRepository cestaRepository) {
        this.cestaRepository = cestaRepository;
    }

    public Cesta criarCesta(Cesta cesta) {
        return cestaRepository.save(cesta);
    }

    public List<Cesta> obterCestasPorIdCliente(Long idCliente) {
        return cestaRepository.findByIdCliente(idCliente);
    }

    public void deletarCestaPorId(Long id) {
        cestaRepository.deleteById(id);
    }
}
