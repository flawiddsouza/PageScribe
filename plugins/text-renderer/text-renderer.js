export default class {
  #mountPoint;
  #onUpdateCallback;
  #text;

  constructor(mountPoint, onUpdateCallback) {
    this.#mountPoint = mountPoint;
    this.#onUpdateCallback = onUpdateCallback;
  }

  render(existingFileContent) {
    this.#text = existingFileContent;
    const textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.resize = 'none';
    textarea.style.padding = '1rem';
    textarea.style.border = '1px solid lightgrey';
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
