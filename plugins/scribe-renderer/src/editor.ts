import { Command, EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, Slice, Fragment, Node } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { history, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, toggleMark, chainCommands, exitCode } from 'prosemirror-commands';
import { undoInputRule } from 'prosemirror-inputrules';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import './main.css';

// Most of this is from: https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/keymap.ts
function createCustomKeyMap(schema: Schema) {
  const mac = typeof navigator != 'undefined' ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false;

  const customKeyMap: { [key: string]: Command } = {};

  // undo / redo

  customKeyMap['Mod-z'] = undo;
  customKeyMap['Shift-Mod-z'] = redo;

  customKeyMap['Backspace'] = undoInputRule;

  if (!mac) {
    customKeyMap['Mod-y'] = redo;
  }

  // bold

  customKeyMap['Mod-b'] = toggleMark(schema.marks.strong);
  customKeyMap['Mod-B'] = toggleMark(schema.marks.strong);

  // italic

  customKeyMap['Mod-i'] = toggleMark(schema.marks.em);
  customKeyMap['Mod-I'] = toggleMark(schema.marks.em);

  // Make shift + enter work

  const br = schema.nodes.hard_break;

  const lineBreakCmd = chainCommands(exitCode, (state, dispatch) => {
    if (dispatch) {
      dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
    }
    return true;
  });

  customKeyMap['Mod-Enter'] = lineBreakCmd;
  customKeyMap['Shift-Enter'] = lineBreakCmd;

  if (mac) {
    customKeyMap['Ctrl-Enter'] = lineBreakCmd;
  }

  return customKeyMap;
}

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
      plugins: [
        keymap(baseKeymap),
        keymap(createCustomKeyMap(mySchema)),
        dropCursor(),
        gapCursor(),
        history(),
      ],
    }),
    // From: https://github.com/bluesky-social/social-app/pull/6658/files
    clipboardTextParser(text, context) {
      const blocks = text.split(/(?:\r\n?|\n)/);
      const nodes: Node[] = blocks.map(line => {
        return Node.fromJSON(
          context.doc.type.schema,
          line.length > 0
            ? {type: 'paragraph', content: [{type: 'text', text: line}]}
            : {type: 'paragraph', content: []},
        );
      });

      const fragment = Fragment.fromArray(nodes);
      return Slice.maxOpen(fragment);
    },
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
