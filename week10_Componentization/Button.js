import {Component, STATE, ATTRIBUTE, createElement} from './framework.js'
import {enabledGesture} from './gesture.js'

export { STATE, ATTRIBUTE } from './framework.js'

export class Button extends Component {
  constructor() {
    super();
  }

  render() {
    this.childrenContainer = <span />;
    this.root = (<div>{this.childrenContainer}</div>).render();
    return this.root;
  }

  appendChild(child) {
      if(!this.childrenContainer)
        this.render();
        this.childrenContainer.appendChild(child);
  }
}