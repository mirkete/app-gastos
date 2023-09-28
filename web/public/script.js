const themeSwitch = document.querySelector('.theme-switch')
const html = document.querySelector('html')
themeSwitch.addEventListener('click', (e) => {
  e.stopPropagation()
  e.preventDefault()
  if (themeSwitch.classList.contains('switch-on')) {
    themeSwitch.classList.add('switch-off')
    html.classList.remove('dark')
    return themeSwitch.classList.remove('switch-on')
  }
  themeSwitch.classList.add('switch-on')
  html.classList.add('dark')
  themeSwitch.classList.remove('switch-off')
})

const colores = ['green', 'yellow', 'lightblue', 'orange', 'red']

function crearHtmlGrupo ({ name, i }) {
  return `<article style="background-color: ${colores[i]};" class="grupo">
    <div class="izquierda-grupo parte-grupo">
      <span class="big-text">${name}</span>
    </div>
    <div class="derecha-grupo parte-grupo">
      <span class="nombre-grupo normal-text">Ultima actualizacion</span>
      <span style="color: rgb(3, 255, 3); line-height: bolder;" class="normal-text">+$100,50</span>
    </div>
  </article>`
}
async function obtenerTeams () {
  const teamsRequest = await fetch('http://192.168.1.3:3000/interactions/user-teams/90914877-0d9d-4881-bdce-87e7dc406bf2')
  const teams = await teamsRequest.json()
  // En el model, pedir el balance de ese grupo
  const html = teams.map((team, i) => {
    return crearHtmlGrupo({ name: `Group ${i + 1}`, i })
  }).join('')
  document.getElementById('groups').innerHTML += html
}

async function obtenerBalance () {
  fetch('http://192.168.1.3:3000/interactions/get-balance/90914877-0d9d-4881-bdce-87e7dc406bf2')
    .then((res) => { return res.json() })
    .then((data) => {
      const { totalBalance } = data
      const finalTotalBalance = totalBalance ?? '-'
      document.getElementById('saldo-section').innerHTML += `<span class="saldo bigger-text">$${finalTotalBalance}</span>`
    })
}

obtenerBalance()
obtenerTeams()
