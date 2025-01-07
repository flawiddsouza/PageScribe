import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-example-setup/style/style.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import './main.css';

export function createEditor(mountPoint: HTMLElement, fileContent: string, updateCallback: (updatedValue: string) => void) {
  // Mix the nodes from prosemirror-schema-list into the basic schema to
  // create a schema with list support.
  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
    marks: schema.spec.marks
  });

  const defaultContent = {
    type: 'doc',
    content: [
      { type: 'paragraph', content: [] }
    ]
  };

  const content = fileContent ? JSON.parse(fileContent) : defaultContent;

  const view = new EditorView(mountPoint, {
    state: EditorState.create({
      doc: mySchema.nodeFromJSON(content),
      plugins: exampleSetup({ schema: mySchema })
    }),
    attributes: {
      spellcheck: 'false'
    },
    dispatchTransaction(transaction) {
      const newState = this.state.apply(transaction);
      view.updateState(newState);

      if (transaction.docChanged) {
        updateCallback(JSON.stringify(newState.doc.toJSON(), null, 4));
      }
    }
  });

  return view;
}
