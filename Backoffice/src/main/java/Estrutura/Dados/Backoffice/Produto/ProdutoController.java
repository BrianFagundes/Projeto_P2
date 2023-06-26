package Estrutura.Dados.Backoffice.Produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    @Autowired
    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public ResponseEntity<List<Produto>> listarProdutos() {
        List<Produto> produtos = produtoService.listarProdutos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> consultarProdutoPorId(@PathVariable Long id) {
        Optional<Produto> produto = produtoService.consultarProdutoPorId(id);
        return produto.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/autor/{autor}")
    public ResponseEntity<List<Produto>> consultarProdutosPorAutor(@PathVariable String autor) {
        List<Produto> produtos = produtoService.consultarProdutosPorAutor(autor);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/nome/{nomeLivro}")
    public ResponseEntity<List<Produto>> consultarProdutosPorNomeLivro(@PathVariable String nomeLivro) {
        List<Produto> produtos = produtoService.consultarProdutosPorNomeLivro(nomeLivro);
        return ResponseEntity.ok(produtos);
    }

    @PostMapping
    public ResponseEntity<Produto> salvarProduto(@RequestBody Produto produto) {
        Produto novoProduto = produtoService.salvarProduto(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        Optional<Produto> produtoExistente = produtoService.consultarProdutoPorId(id);
        if (produtoExistente.isPresent()) {
            Produto produto = produtoExistente.get();
            produto.setNomeLivro(produtoAtualizado.getNomeLivro());
            produto.setDescricao(produtoAtualizado.getDescricao());
            produto.setAutor(produtoAtualizado.getAutor());
            produto.setValor(produtoAtualizado.getValor());
            Produto produtoAtualizado2 = produtoService.salvarProduto(produto);
            return ResponseEntity.ok(produtoAtualizado2);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirProduto(@PathVariable Long id) {
        produtoService.excluirProduto(id);
        return ResponseEntity.noContent().build();
    }
}

