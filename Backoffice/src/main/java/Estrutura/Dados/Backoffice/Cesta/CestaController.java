package Estrutura.Dados.Backoffice.Cesta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/cestas")
public class CestaController {

    private final CestaService cestaService;

    @Autowired
    public CestaController(CestaService cestaService) {
        this.cestaService = cestaService;
    }

    @PostMapping
    public ResponseEntity<Cesta> criarCesta(@RequestBody Cesta cesta) {
        Cesta novaCesta = cestaService.criarCesta(cesta);
        return new ResponseEntity<>(novaCesta, HttpStatus.CREATED);
    }

    @GetMapping("/{idCliente}")
    public ResponseEntity<List<Cesta>> obterCestasPorIdCliente(@PathVariable Long idCliente) {
        List<Cesta> cestas = cestaService.obterCestasPorIdCliente(idCliente);
        return new ResponseEntity<>(cestas, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCestaPorId(@PathVariable Long id) {
        cestaService.deletarCestaPorId(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
