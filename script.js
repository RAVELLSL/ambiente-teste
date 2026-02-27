const videos = [
  {
    title: 'React na prática: criando dashboard responsivo',
    category: 'Front-end',
    level: 'Intermediário',
    duration: '22:10',
    instructor: 'Luana Costa',
    description: 'Monte um dashboard completo com componentes reutilizáveis e gráficos dinâmicos.',
    progress: 62,
  },
  {
    title: 'API Node.js com autenticação JWT e boas práticas',
    category: 'Back-end',
    level: 'Avançado',
    duration: '31:45',
    instructor: 'Rafael Mendes',
    description: 'Aprenda arquitetura em camadas, segurança e documentação de APIs REST.',
    progress: 28,
  },
  {
    title: 'Python para IA: classificação com scikit-learn',
    category: 'Inteligência Artificial',
    level: 'Intermediário',
    duration: '26:30',
    instructor: 'Marina Silva',
    description: 'Construa seu primeiro pipeline de machine learning com avaliação e métricas.',
    progress: 44,
  },
  {
    title: 'Fundamentos de cloud com AWS para iniciantes',
    category: 'Cloud',
    level: 'Iniciante',
    duration: '19:40',
    instructor: 'Igor Pires',
    description: 'Entenda computação em nuvem, serviços essenciais e práticas de deploy.',
    progress: 12,
  },
  {
    title: 'Cibersegurança no dia a dia do dev',
    category: 'Segurança',
    level: 'Intermediário',
    duration: '24:15',
    instructor: 'Karina Soares',
    description: 'Conheça vulnerabilidades comuns e como proteger aplicações modernas.',
    progress: 75,
  },
  {
    title: 'Design de produto para devs: UX que converte',
    category: 'Produto',
    level: 'Iniciante',
    duration: '18:05',
    instructor: 'Felipe Azevedo',
    description: 'Transforme feedback em melhorias e projete interfaces mais intuitivas.',
    progress: 35,
  },
];

const tracks = [
  { name: 'Desenvolvedor Full Stack', steps: 12, outcome: 'Crie apps completos do front ao deploy.' },
  { name: 'Engenheiro de IA Aplicada', steps: 9, outcome: 'Projete soluções de IA para problemas reais.' },
  { name: 'Cloud & DevOps Essentials', steps: 8, outcome: 'Domine infraestrutura, CI/CD e observabilidade.' },
];

const feedSeed = [
  'Ana: Alguém recomenda um projeto para praticar autenticação social?',
  'Diego: Terminei a trilha de Cloud! Vale muito pelos laboratórios.',
  'Pri: Excelente aula de React, a parte de estado global foi ouro.',
];

const refs = {
  videoGrid: document.getElementById('videoGrid'),
  trackGrid: document.getElementById('trackGrid'),
  searchInput: document.getElementById('searchInput'),
  categoryFilter: document.getElementById('categoryFilter'),
  featuredCategory: document.getElementById('featuredCategory'),
  featuredDuration: document.getElementById('featuredDuration'),
  featuredTitle: document.getElementById('featuredTitle'),
  featuredDescription: document.getElementById('featuredDescription'),
  featuredInstructor: document.getElementById('featuredInstructor'),
  statVideos: document.getElementById('statVideos'),
  statHours: document.getElementById('statHours'),
  statTracks: document.getElementById('statTracks'),
  feedList: document.getElementById('feedList'),
  postForm: document.getElementById('postForm'),
  postInput: document.getElementById('postInput'),
  themeToggle: document.getElementById('themeToggle'),
};

function parseDurationToMinutes(duration) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes + seconds / 60;
}

function fillStats() {
  const hours = videos.reduce((acc, item) => acc + parseDurationToMinutes(item.duration), 0) / 60;
  refs.statVideos.textContent = String(videos.length);
  refs.statHours.textContent = `${hours.toFixed(1)}h`;
  refs.statTracks.textContent = String(tracks.length);
}

function renderCategoryOptions() {
  const categories = [...new Set(videos.map((video) => video.category))];
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    refs.categoryFilter.append(option);
  });
}

function renderVideos(list) {
  refs.videoGrid.innerHTML = '';
  const template = document.getElementById('videoCardTemplate');

  list.forEach((video) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector('.pill').textContent = video.category;
    fragment.querySelector('.duration').textContent = video.duration;
    fragment.querySelector('h3').textContent = video.title;
    fragment.querySelector('.meta').textContent = `${video.level} • ${video.instructor}`;

    const progress = fragment.querySelector('progress');
    progress.value = video.progress;
    fragment.querySelector('small').textContent = `${video.progress}% concluído`;

    fragment.querySelector('button').addEventListener('click', () => setFeatured(video));
    refs.videoGrid.append(fragment);
  });
}

function renderTracks() {
  refs.trackGrid.innerHTML = tracks
    .map((track) => `
      <article class="track-item">
        <h3>${track.name}</h3>
        <p>${track.outcome}</p>
        <small>${track.steps} módulos</small>
      </article>
    `)
    .join('');
}

function setFeatured(video) {
  refs.featuredCategory.textContent = `• ${video.category.toUpperCase()}`;
  refs.featuredDuration.textContent = video.duration;
  refs.featuredTitle.textContent = video.title;
  refs.featuredDescription.textContent = video.description;
  refs.featuredInstructor.textContent = `Mentor(a): ${video.instructor}`;
}

function applyFilters() {
  const term = refs.searchInput.value.trim().toLowerCase();
  const category = refs.categoryFilter.value;

  const filtered = videos.filter((video) => {
    const matchesCategory = category === 'all' || video.category === category;
    const haystack = `${video.title} ${video.level} ${video.category}`.toLowerCase();
    return matchesCategory && haystack.includes(term);
  });

  renderVideos(filtered);
}

function renderFeed() {
  refs.feedList.innerHTML = '';
  feedSeed.forEach((post) => {
    const li = document.createElement('li');
    li.textContent = post;
    refs.feedList.append(li);
  });
}

function handlePost(event) {
  event.preventDefault();
  const text = refs.postInput.value.trim();
  if (!text) return;
  feedSeed.unshift(`Você: ${text}`);
  refs.postInput.value = '';
  renderFeed();
}

function setRandomFeatured() {
  const random = videos[Math.floor(Math.random() * videos.length)];
  setFeatured(random);
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  refs.themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Modo claro' : '🌙 Modo noturno';
}

function initEvents() {
  refs.themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Modo claro' : '🌙 Modo noturno';
  refs.searchInput.addEventListener('input', applyFilters);
  refs.categoryFilter.addEventListener('change', applyFilters);
  refs.postForm.addEventListener('submit', handlePost);
  refs.themeToggle.addEventListener('click', toggleTheme);

  document.getElementById('shuffleVideoBtn').addEventListener('click', setRandomFeatured);
  document.getElementById('startJourneyBtn').addEventListener('click', () => {
    document.getElementById('biblioteca').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('watchNowBtn').addEventListener('click', () => {
    document.getElementById('comunidade').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('saveLaterBtn').addEventListener('click', () => {
    feedSeed.unshift('Sistema: aula salva na sua lista "Assistir depois" ✅');
    renderFeed();
  });
}

fillStats();
renderCategoryOptions();
renderVideos(videos);
renderTracks();
renderFeed();
setFeatured(videos[0]);
initEvents();
