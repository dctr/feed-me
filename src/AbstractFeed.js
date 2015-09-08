export default class AbstractFeed {
  constructor() {
  }
  get entries() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
  get title() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
}
