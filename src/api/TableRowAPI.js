
export class TableRowAPI {
  task = ''
  modifier = ''
  taskCost = 0
  modValue = 1
  count = 1

  editable = false

  resetTask () {
    this.task = ''
    this.taskCost = 0
    this.count = 1
    this.editable = false
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
    this.count = tableRow.count
    this.editable = tableRow.editable

    return this
  }
}
