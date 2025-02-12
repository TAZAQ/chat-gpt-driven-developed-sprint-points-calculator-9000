
export class TableRowAPI {
  task = ''
  modifier = ''
  taskCost = 0
  modValue = 1

  resetTask () {
    this.task = ''
    this.taskCost = 0
  }

  resetModifier () {
    this.modifier = ''
    this.modValue = 1
  }

  /** @param {TableRowAPI} tableRow */
  cloneRow (tableRow) {
    this.task = tableRow.task
    this.modifier = tableRow.modifier
    this.taskCost = tableRow.taskCost
    this.modValue = tableRow.modValue

    return this
  }
}
