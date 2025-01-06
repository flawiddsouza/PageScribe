import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/+esm';

export default class {
  #mountPoint;
  #onUpdateCallback;
  #fontFamily;
  #fontSize;
  #text;

  constructor(options) {
    this.#mountPoint = options.mountPoint;
    this.#onUpdateCallback = options.onUpdateCallback;
    this.#fontFamily = options.fontFamily;
    this.#fontSize = options.fontSize;
  }

  render(existingFileContent) {
    this.#text = existingFileContent;

    const editor = monaco.editor.create(this.#mountPoint, {
      value: this.#text,
      theme: 'vs-light',
      padding: {
        top: 15
      },
      automaticLayout: true,
      wordWrap: 'on'
    });

    editor.getModel().onDidChangeContent(() => {
      this.#text = editor.getValue();
      this.#onUpdateCallback();
    });

    editor.focus();
  }

  getFileContent() {
    return this.#text;
  }
}
