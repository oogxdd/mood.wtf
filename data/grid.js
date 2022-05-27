import { ROWS_COUNT, COLUMNS_COUNT } from 'constants'

const rows = [1, 2, 3, 4, 5, 6, 7]
const columns = [1, 2, 3, 4, 5, 6, 7]

let blocks = []

rows.map((row) => {
  columns.map((column) => {
    const isOwner = false
    blocks.push({
      x: row,
      y: column,
      owner: isOwner ? 'maxim' : undefined,
    })
  })
})

export { blocks }
