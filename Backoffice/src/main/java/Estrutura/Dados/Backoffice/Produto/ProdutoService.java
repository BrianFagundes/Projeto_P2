package Estrutura.Dados.Backoffice.Produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> consultarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public List<Produto> consultarProdutosPorNomeLivro(String nomeLivro) {
        return produtoRepository.findByNomeLivroContainingIgnoreCase(nomeLivro);
    }

    public List<Produto> consultarProdutosPorAutor(String autor) {
        return produtoRepository.findByAutorContainingIgnoreCase(autor);
    }

    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public void excluirProduto(Long id) {
        produtoRepository.deleteById(id);
    }
}

