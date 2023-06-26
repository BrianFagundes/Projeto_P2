package Estrutura.Dados.Backoffice.Cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {
        List<Cliente> clientes = clienteService.listarClientes();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarClientePorId(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteService.buscarClientePorId(id);
        return cliente.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Cliente> salvarCliente(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.salvarCliente(cliente);
        return new ResponseEntity<>(novoCliente, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteService.buscarClientePorId(id);
        if (clienteExistente.isPresent()) {
            Cliente cliente = clienteExistente.get();
            cliente.setNomeCompleto(clienteAtualizado.getNomeCompleto());
            cliente.setEmail(clienteAtualizado.getEmail());
            cliente.setSenha(clienteAtualizado.getSenha());
            cliente.setEnderecoEntrega(clienteAtualizado.getEnderecoEntrega());
            cliente.setCidade(clienteAtualizado.getCidade());
            cliente.setEstado(clienteAtualizado.getEstado());

            Cliente clienteAtualizado2 = clienteService.salvarCliente(cliente);
            return new ResponseEntity<>(clienteAtualizado2, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirCliente(@PathVariable Long id) {
        boolean clienteExcluido = clienteService.excluirCliente(id);
        if (clienteExcluido) {
            return new ResponseEntity<>("Cliente excluído com sucesso", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Falha ao excluir o cliente", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Cliente>> buscarClientePorEmail(@PathVariable String email) {
        List<Cliente> clientes = clienteService.buscarClientePorEmail(email);
        return ResponseEntity.ok(clientes);
    }

}

