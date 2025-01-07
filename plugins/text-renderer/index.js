export default class {
  #mountPoint;
  #onUpdateCallback;
  #fontFamily;
  #fontSize;
  #fileContent;

  constructor(options) {
    this.#mountPoint = options.mountPoint;
    this.#onUpdateCallback = options.onUpdateCallback;
    this.#fontFamily = options.fontFamily;
    this.#fontSize = options.fontSize;
    this.#fileContent = options.fileContent;
  }

  render() {
    const textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.resize = 'none';
    textarea.style.padding = '1rem';
    textarea.style.outline = 'none';
    textarea.style.border = '0';
    textarea.style.fontFamily = this.#fontFamily;
    textarea.style.fontSize = this.#fontSize;
    textarea.spellcheck = false;
    textarea.value = this.#fileContent;
    textarea.addEventListener('input', (e) => {
      this.#fileContent = e.target.value;
      this.#onUpdateCallback();
    });
    this.#mountPoint.appendChild(textarea);
    textarea.focus();
  }

  getFileContent() {
    return this.#fileContent;
  }
}
