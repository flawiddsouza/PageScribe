import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/+esm';

export default class {
  #mountPoint;
  #onUpdateCallback;
  #fontFamily;
  #fontSize;
  #fileExtension;
  #fileContent;

  constructor(options) {
    this.#mountPoint = options.mountPoint;
    this.#onUpdateCallback = options.onUpdateCallback;
    this.#fontFamily = options.fontFamily;
    this.#fontSize = options.fontSize;
    this.#fileExtension = options.fileExtension;
    this.#fileContent = options.fileContent;
  }

  render() {
    let language = 'plaintext';

    if (this.#fileExtension === '.js') {
      language = 'javascript';
    }

    if (this.#fileExtension === '.ts') {
      language = 'typescript';
    }

    if (this.#fileExtension === '.css') {
      language = 'css';
    }

    if (this.#fileExtension === '.vue') {
      language = 'vue';
    }

    const editor = monaco.editor.create(this.#mountPoint, {
      language,
      value: this.#fileContent,
      theme: 'vs-light',
      fontFamily: this.#fontFamily,
      fontSize: this.#fontSize,
      padding: {
        top: 15
      },
      automaticLayout: true,
      wordWrap: 'on'
    });

    editor.getModel().onDidChangeContent(() => {
      this.#fileContent = editor.getValue();
      this.#onUpdateCallback();
    });

    editor.focus();
  }

  getFileContent() {
    return this.#fileContent;
  }
}
