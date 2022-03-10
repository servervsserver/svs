
/**
* Represents a timeline milestone in an event with a name a date and a description.
*/
export class EventMilestone {
  /**
  * Creates an event milestone
  * {string} name : The name of the milestone
  * {Date} date : the date at which the milestone is reached
  * {string} description : a small description of the milestone
  */
  constructor(name, date, description) {
    this.name = name
    this.date = date
    this.description = description || ""
  }

  get timeRemaining() {
    return this.date.getTime() - Date.now()
  }

  get timeFrom() {
    return - this.timeRemaining
  }

  get isPast() {
    return this.timeRemaining < 0
  }

  get isIncoming() {
    return this.timeRemaining > 0
  }
}
