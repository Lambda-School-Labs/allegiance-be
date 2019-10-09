function createSports(tbl) {
  tbl.increments()
  tbl.string('name')
  tbl.timestamps(true, true)
}
module.exports = createSports
