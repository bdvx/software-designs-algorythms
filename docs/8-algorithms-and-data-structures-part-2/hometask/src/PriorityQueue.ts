interface PriorityQueueI<T> {
  enqueue(value: T, priority: number): void;
  dequeue(): Function;
  size(): number;
}

// User defined class
// to store element and its priority
export class QElement {
  element: Function 
  priority: number
  constructor(element, priority)
  {
      this.element = element;
      this.priority = priority;
  }
}

export class PriorityQueue<T> implements PriorityQueueI<T> {
  items: Array<QElement>
  // An array is used to implement priority
  constructor()
  {
      this.items = [];
  }

  // enqueue function to add element
  // to the queue as per priority
  public enqueue(element, priority)
  {
      // creating object from queue element
      var qElement = new QElement(element, priority);
      var contain = false;
  
      // iterating through the entire
      // item array to add element at the
      // correct location of the Queue
      for (var i = 0; i < this.items.length; i++) {
          if (this.items[i].priority > qElement.priority) {
              // Once the correct location is found it is
              // enqueued
              this.items.splice(i, 0, qElement);
              contain = true;
              break;
          }
      }
  
      // if the element have the highest priority
      // it is added at the end of the queue
      if (!contain) {
          this.items.push(qElement);
      }
  }
  public isEmpty()
  {
    return this.items.length == 0
  }
  // dequeue method to remove
  // element from the queue
  public dequeue()
  {
      // return the dequeued element
      // and remove it.
      // if the queue is empty
      // returns Underflow
      if (!this.isEmpty())
          return this.items.shift().element;
  }
  public size()
  {
      return this.items.length;
  }
}