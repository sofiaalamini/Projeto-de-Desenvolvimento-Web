import Header from './components/Header'
import Navigation from './components/Navigation'
import Article from './components/Article'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

const post = {
  title: 'Descobrindo as praias do Nordeste',
  author: 'Por Marina Vasconcelos',
  date: '15 de agosto de 2025',
  dateTime: '2025-08-15',
  category: 'Diário de viagem',
  paragraphs: [
    'O Nordeste brasileiro reúne praias de águas cristalinas, paisagens inesquecíveis e uma cultura rica. Cada destino oferece experiências únicas para quem deseja descansar e conhecer novos lugares.',
    'Durante a viagem, visitamos piscinas naturais, experimentamos pratos típicos e acompanhamos um belo pôr do sol à beira-mar. Foi uma aventura repleta de descobertas e boas lembranças.',
  ],
  image: {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Praia de areia clara, mar azul e céu com nuvens',
    caption: 'Uma das belas paisagens encontradas no litoral nordestino.',
  },
}

const relatedPosts = [
  { title: 'Roteiro de cinco dias em Recife', href: '#roteiro' },
  { title: 'Sabores típicos do Nordeste', href: '#gastronomia' },
  { title: 'Dicas para viajar gastando pouco', href: '#dicas' },
]

function App() {
  return (
    <div className="site-shell">
      <Header title="Meu Blog de Viagens">
        <Navigation />
      </Header>

      <main className="content-grid" id="inicio">
        <Article post={post} />
        <Sidebar posts={relatedPosts} />
      </main>

      <Footer year="2025" email="contato@meublogdeviagens.com" />
    </div>
  )
}

export default App
