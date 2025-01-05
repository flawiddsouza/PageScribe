export default class {
  #text;
  #mountPoint;

  constructor(mountPoint) {
    this.#mountPoint = mountPoint;
  }

  render(existingFileContent) {
    this.#text = existingFileContent;
    const textarea = document.createElement('textarea');
    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.resize = 'none';
    textarea.style.padding = '1rem';
    textarea.spellcheck = false;
    textarea.value = this.#text;
    textarea.addEventListener('input', (e) => {
      this.#text = e.target.value;
    })
    this.#mountPoint.appendChild(textarea);
    textarea.focus();
  }

  getFileContent() {
    return this.#text;
  }
}
