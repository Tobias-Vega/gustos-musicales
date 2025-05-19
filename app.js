const bands = [
  'Nirvana',
  'Nine Inch Nails',
  'Backstreet Boys',
  'N Sync',
  'Night Club',
  'Apashe',
  'STP',
]

const features = ['Grunge', 'Rock', 'Industrial', 'Boy Band', 'Dance', 'Techno']

const band_feats = tf.tensor([
  [1, 1, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0, 1],
  [1, 1, 0, 0, 0, 0],
])

const bandInputs = document.getElementById('bandInputs')
bands.forEach((band, index) => {
  const div = document.createElement('div')
  div.classList.add('band-item')
  div.innerHTML = `
    <label for="band-${index}">${band}</label>
    <input type="number" id="band-${index}" name="band-${index}" min="1" max="10" required />
  `
  bandInputs.appendChild(div)
})

document.getElementById('ratingsForm').addEventListener('submit', (e) => {
  e.preventDefault()

  const userVotes = bands.map((_, i) =>
    parseInt(document.getElementById(`band-${i}`).value)
  )

  tf.tidy(() => {
    const voteTensor = tf.tensor2d([userVotes])
    const user_feats = tf.matMul(voteTensor, band_feats)
    const top_user_features = tf.topk(user_feats, features.length)
    const top_genres = top_user_features.indices.arraySync()[0]

    const rankedCategories = top_genres.map((v) => features[v])

    const resultDiv = document.getElementById('result')
    resultDiv.innerHTML = `
      <h2>Tu Ranking de Estilos Musicales</h2>
      <ol>
        ${rankedCategories.map((genre) => `<li>${genre}</li>`).join('')}
      </ol>
    `
  })
})
