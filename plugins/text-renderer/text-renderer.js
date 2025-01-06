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
    const textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.resize = 'none';
    textarea.style.padding = '1rem';
    textarea.style.outline = 'none';
    textarea.style.border = '1px solid lightgrey';
    textarea.style.fontFamily = this.#fontFamily;
    textarea.style.fontSize = this.#fontSize;
    textarea.spellcheck = false;
    textarea.value = this.#text;
    textarea.addEventListener('input', (e) => {
      this.#text = e.target.value;
      this.#onUpdateCallback();
    })
    this.#mountPoint.appendChild(textarea);
    textarea.focus();
  }

  getFileContent() {
    return this.#text;
  }
}
