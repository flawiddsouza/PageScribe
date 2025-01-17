import { createEditor } from './editor';

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
    const { view: editor, focusEnd } = createEditor(this.#mountPoint, this.#fileContent, (updatedValue) => {
      this.#fileContent = updatedValue;
      this.#onUpdateCallback();
    });
    editor.dom.style.fontFamily = this.#fontFamily;
    editor.dom.style.fontSize = this.#fontSize;
    focusEnd();
  }

  getFileContent() {
    return this.#fileContent;
  }
}
