import { mount } from 'svelte';
import Table from './Table.svelte';

interface Options {
  mountPoint: HTMLElement;
  onUpdateCallback: () => void;
  fontFamily: string;
  fontSize: string;
  fileContent: string;
}

export default class {
  #mountPoint;
  #onUpdateCallback;
  #fontFamily;
  #fontSize;
  #fileContent;

  constructor(options: Options) {
    this.#mountPoint = options.mountPoint;
    this.#onUpdateCallback = options.onUpdateCallback;
    this.#fontFamily = options.fontFamily;
    this.#fontSize = options.fontSize;
    this.#fileContent = options.fileContent;
  }

  render() {
    mount(Table, {
      target: this.#mountPoint,
      props: {
        content: this.#fileContent,
        onUpdate: (updatedContent: string) => {
          this.#fileContent = updatedContent;
          this.#onUpdateCallback();
        },
        style: `font-family: ${this.#fontFamily}; font-size: ${this.#fontSize};`
      }
    });
  }

  getFileContent() {
    return this.#fileContent;
  }
}
