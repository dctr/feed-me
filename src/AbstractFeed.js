/**
 * Abstract base class for web feeds
 */
export default class AbstractFeed {
  constructor() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
  get entries() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
  get title() {
    throw new Error('Pseudo-abstract class, method not implmemented');
  }
}
