var coresTipo = {
  fire:     { bg: '#FDECE0', text: '#A33C1D' },
  water:    { bg: '#E0EEF9', text: '#185FA5' },
  grass:    { bg: '#EAF3DE', text: '#3B6D11' },
  electric: { bg: '#FEF8DC', text: '#856A0B' },
  psychic:  { bg: '#FBEAF0', text: '#993556' },
  ice:      { bg: '#E0F4F6', text: '#0F6E56' },
  dragon:   { bg: '#E8E6FE', text: '#3C3489' },
  dark:     { bg: '#E2E2E2', text: '#2C2C2A' },
  fairy:    { bg: '#FAEEF5', text: '#722A3E' },
  normal:   { bg: '#F1EFE8', text: '#5F5E5A' },
  fighting: { bg: '#FAE9E7', text: '#712B13' },
  flying:   { bg: '#EDE8FE', text: '#534AB7' },
  poison:   { bg: '#F5E0F5', text: '#6E1E7A' },
  ground:   { bg: '#FAF0DA', text: '#854F0B' },
  rock:     { bg: '#EDE8D8', text: '#5F5E5A' },
  bug:      { bg: '#EDF2D8', text: '#3B6D11' },
  ghost:    { bg: '#EAE0F5', text: '#3C3489' },
  steel:    { bg: '#E8EBF0', text: '#444441' },
};

var nomesStats = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Veloc.',
};

var coresBarra = {
  hp: '#E24B4A',
  attack: '#D85A30',
  defense: '#185FA5',
  'special-attack': '#D4537E',
  'special-defense': '#1D9E75',
  speed: '#7F77DD',
};

var iconesTipo = {
  fire: '🔥',
  water: '💧',
  grass: '🍃',
  electric: '⚡',
  psychic: '🔮',
  ice: '❄️',
  dragon: '🐉',
  dark: '🌙',
  fairy: '✨',
  normal: '⭐',
  fighting: '🥊',
  flying: '🦅',
  poison: '☠️',
  ground: '⛰️',
  rock: '🪨',
  bug: '🐛',
  ghost: '👻',
  steel: '⚙️'
};

async function buscarPokemon() {
  const input = document.getElementById('input-pokemon');
  const status = document.getElementById('status');
  const card = document.getElementById('card');
  const sensor = document.getElementById('sensor-principal');
  const valor = input.value.trim().toLowerCase();

  if (!valor) {
    status.innerHTML = '<span>Digite o nome ou número de um Pokémon.</span>';
    return;
  }

  card.classList.remove('visivel');
  
  status.innerHTML = `
    <div class="loader-pokeball"></div>
    <span>Acessando Banco de Dados...</span>
  `;

  sensor.style.animation = 'lensGlow 0.5s infinite alternate';

  try {
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon/' + valor);

    if (!resposta.ok) {
      status.innerHTML = '❌ Pokémon não encontrado. Tente outro nome ou número.';
      sensor.style.animation = 'lensGlow 3s infinite alternate';
      return;
    }

    const dados = await resposta.json();
    
    status.innerHTML = '';

    const imagemPokemon = document.getElementById('imagem-pokemon');
    imagemPokemon.src =
      dados.sprites.other['official-artwork'].front_default ||
      dados.sprites.front_default ||
      '';
    imagemPokemon.alt = dados.name;

    document.getElementById('nome-pokemon').textContent = dados.name;
    document.getElementById('numero-pokemon').textContent =
      '#' + String(dados.id).padStart(3, '0');

    const tiposDiv = document.getElementById('tipos-pokemon');
    tiposDiv.innerHTML = '';
    
    dados.types.forEach(function(t) {
      const tipo = t.type.name;
      const cores = coresTipo[tipo] || { bg: 'rgba(255,255,255,0.1)', text: '#fff' };
      const icone = iconesTipo[tipo] || '👾';
      
      const span = document.createElement('span');
      span.className = 'tipo';
      span.innerHTML = `<span>${icone}</span> <span>${tipo}</span>`;
      span.style.backgroundColor = cores.bg;
      span.style.color = cores.text;
      span.style.borderColor = cores.text + '33';
      tiposDiv.appendChild(span);
    });

    const tipoPrimario = dados.types[0].type.name;
    const corAura = coresBarra[tipoPrimario] || '#e11d48';
    card.style.setProperty('--type-glow', corAura + '33');

    const statsDiv = document.getElementById('stats-pokemon');
    statsDiv.innerHTML = '';
    
    dados.stats.forEach(function(s) {
      const nome = s.stat.name;
      const valorStat = s.base_stat;
      const cor = coresBarra[nome] || '#888';
      const porcentagem = Math.min((valorStat / 255) * 100, 100);
      
      const linha = document.createElement('div');
      linha.className = 'stat-linha';
      
      linha.innerHTML = `
        <span class="stat-nome">${nomesStats[nome] || nome}</span>
        <div class="stat-barra-bg">
          <div class="stat-barra" data-width="${porcentagem}%" style="width: 0%; background-color: ${cor}; color: ${cor};"></div>
        </div>
        <span class="stat-valor">${valorStat}</span>
      `;
      statsDiv.appendChild(linha);
    });

    card.classList.add('visivel');
    
    sensor.style.animation = 'lensGlow 3s infinite alternate';

    setTimeout(() => {
      const barras = card.querySelectorAll('.stat-barra');
      barras.forEach(barra => {
        barra.style.width = barra.getAttribute('data-width');
      });
    }, 100);

  } catch (erro) {
    status.innerHTML = '⚠️ Erro de conexão. Verifique sua internet.';
    sensor.style.animation = 'lensGlow 3s infinite alternate';
  }
}

document.getElementById('input-pokemon').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    buscarPokemon();
  }
});
