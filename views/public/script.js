async function hacerAlgo () {
  const request = await fetch('http://192.168.1.3:3000/interactions/teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: '90914877-0d9d-4881-bdce-87e7dc406bf2'
    })
  })
  const teams = await request.json()

  const html = teams.map((team) => {
    return `<article class='group'><div><span style='font-weight:bold; font-size:1.5em;'>${team.name}</span><p style="font-size:1em;">People</p></div><div style='text-align:center;'><span style='font-weight:bold; font-size:1.3em;'>Last update<br/></span><span class='price' style='font-size:1.5em; font-weight:bold;'>+$183,60</span></div></article>`
  }).join('')
  document.getElementById('groups').innerHTML += html
}

hacerAlgo()
