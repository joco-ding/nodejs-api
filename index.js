import express from "express"
import morgan from "morgan"

const port = 8087 
const app = express()

let films = Array(
  { id: 1, judul: "Gods of Egypt", kategori: "Laga" },
  { id: 2, judul: "Spider-man Homecoming", kategori: "Laga" },
  { id: 3, judul: "Now You See Me", kategori: "Kriminal" },
)

function getAllFilm(_, res) {
  res.status(200).json({ ok: true, data: films, message: 'Berhasil' })
}

function addFilm(req, res) {
  const { judul, kategori } = req.body
  const id = films.length + 1
  const film = { id, judul, kategori }
  films.push(film)
  res.status(200).json({ ok: true, data: film, message: 'Berhasil' })
}

function getFilm(req, res) {
  const id = parseInt(req.params.id, 32)
  const film = films.find(f => f.id === id)
  if (typeof film === 'undefined')
    res.status(404).json({ ok: false, message: 'Film tidak ditemukan' })
  else
    res.status(200).json({ ok: true, data: film, message: 'Berhasil' })
}

function putFilm(req, res) {
  const id = parseInt(req.params.id, 32)
  const film = films.find(f => f.id === id)
  if (typeof film === 'undefined') {
    res.status(404).json({ ok: false, message: 'Film tidak ditemukan' })
    return
  }
  const { judul, kategori } = req.body
  const updatedFilm = { id, judul, kategori }
  const objekIndeks = films.findIndex(f => f.id === id)
  if (objekIndeks < 0) {
    res.status(404).json({ ok: false, message: 'Film tidak ditemukan' })
    return
  }
  films[objekIndeks] = updatedFilm
  res.status(200).json({ ok: true, data: updatedFilm, message: 'Berhasil' })
}

function delFilm(req, res) {
  const id = parseInt(req.params.id, 32)

  const objekIndeks = films.findIndex(f => f.id === id)
  if (objekIndeks < 0) {
    res.status(404).json({ ok: false, message: 'Film tidak ditemukan' })
    return
  }
  films.splice(objekIndeks, 1)
  res.status(200).json({ ok: true, message: 'Berhasil', data: films })
}

app.use(morgan('combined'))
app.use(express.json())

app.get("/films", getAllFilm)
app.post("/film", addFilm)
app.get("/film/:id", getFilm)
app.put("/film/:id", putFilm)
app.delete("/film/:id", delFilm)

app.listen(port)
console.log(`API sudah aktif di port ${port}`)