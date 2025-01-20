import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  }
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

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
