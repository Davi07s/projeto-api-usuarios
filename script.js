let allUsers = [];

async function loadUsers() {
  const gender = document.getElementById('gender').value;
  const nat = document.getElementById('nat').value;
  const count = document.getElementById('count').value;

  const url = `api.php?results=${count}${gender ? '&gender='+gender : ''}${nat ? '&nat='+nat : ''}`;

  const container = document.getElementById('users');
  container.innerHTML = "<p>Carregando...</p>";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    allUsers = data.results;
    applyFilters();

  } catch (erro) {
    console.error(erro);
    container.innerHTML = "<p style='color:red;'>Erro ao carregar usuários.</p>";
  }
}

function renderUsers(users) {
  const container = document.getElementById('users');

  if (users.length === 0) {
    container.innerHTML = "<p>Nenhum usuário encontrado.</p>";
    return;
  }

  container.innerHTML = users.map(u => `
    <div class="card">
      <img src="${u.picture.large}">
      <h2>${u.name.first} ${u.name.last}</h2>
      <p><strong>Email:</strong> ${u.email}</p>
      <p><strong>Local:</strong> ${u.location.city}, ${u.location.country}</p>
      <p><strong>Idade:</strong> ${u.dob.age} anos</p>
    </div>
  `).join('');
}

function applyFilters() {
  const term = document.getElementById('search').value.toLowerCase();
  const age = document.getElementById('age').value;

  let filtered = allUsers.filter(u =>
    (u.name.first + " " + u.name.last).toLowerCase().includes(term)
  );

  if (age) {
    filtered = filtered.filter(u => u.dob.age == age);
  }

  renderUsers(filtered);
}

document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('age').addEventListener('input', applyFilters);
document.getElementById('load').addEventListener('click', loadUsers);

loadUsers();