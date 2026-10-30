import { useState, useEffect } from 'react'

const URL = '/api/produtos'

function App() {
  const [produtos, setProdutos] = useState([])
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState(false)

  function mostrarMensagem(texto, ehErro) {
    setMensagem(texto)
    setErro(ehErro)
  }

  async function carregarProdutos() {
    try {
      const resposta = await fetch(URL)
      const dados = await resposta.json()
      setProdutos(dados)
    } catch (e) {
      mostrarMensagem('Não foi possível carregar os produtos.', true)
    }
  }

  // carrega a lista quando a página abre
  useEffect(() => {
    carregarProdutos()
  }, [])

  async function cadastrar(evento) {
    evento.preventDefault()

    try {
      const resposta = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome, preco: Number(preco) }),
      })
      const dados = await resposta.json()

      if (resposta.ok) {
        mostrarMensagem('Produto cadastrado com sucesso!', false)
        setNome('')
        setPreco('')
        carregarProdutos()
      } else {
        mostrarMensagem(dados.erro, true)
      }
    } catch (e) {
      mostrarMensagem('Erro ao conectar com a API.', true)
    }
  }

  async function excluir(id) {
    try {
      const resposta = await fetch(URL + '/' + id, { method: 'DELETE' })
      const dados = await resposta.json()

      if (resposta.ok) {
        mostrarMensagem(dados.mensagem, false)
        carregarProdutos()
      } else {
        mostrarMensagem(dados.erro, true)
      }
    } catch (e) {
      mostrarMensagem('Erro ao conectar com a API.', true)
    }
  }

  return (
    <div className="container">
      <h1>Produtos</h1>

      {mensagem && (
        <p className={erro ? 'mensagem erro' : 'mensagem sucesso'}>{mensagem}</p>
      )}

      <form onSubmit={cadastrar}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>
                <button className="excluir" onClick={() => excluir(produto.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}
    </div>
  )
}

export default App
