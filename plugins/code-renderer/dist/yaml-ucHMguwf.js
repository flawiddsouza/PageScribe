import { m as l } from "./index-DVJfp3RD.js";
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.2(404545bded1df6ffa41ea0af4e8ddb219018c6c1)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var i = Object.defineProperty, c = Object.getOwnPropertyDescriptor, u = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, d = (n, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let t of u(e))
      !s.call(n, t) && t !== r && i(n, t, { get: () => e[t], enumerable: !(o = c(e, t)) || o.enumerable });
  return n;
}, m = (n, e, r) => (d(n, e, "default"), r), a = {};
m(a, l);
var p = {
  comments: {
    lineComment: "#"
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  folding: {
    offSide: !0
  },
  onEnterRules: [
    {
      beforeText: /:\s*$/,
      action: {
        indentAction: a.languages.IndentAction.Indent
      }
    }
  ]
}, f = {
  tokenPostfix: ".yaml",
  brackets: [
    { token: "delimiter.bracket", open: "{", close: "}" },
    { token: "delimiter.square", open: "[", close: "]" }
  ],
  keywords: ["true", "True", "TRUE", "false", "False", "FALSE", "null", "Null", "Null", "~"],
  numberInteger: /(?:0|[+-]?[0-9]+)/,
  numberFloat: /(?:0|[+-]?[0-9]+)(?:\.[0-9]+)?(?:e[-+][1-9][0-9]*)?/,
  numberOctal: /0o[0-7]+/,
  numberHex: /0x[0-9a-fA-F]+/,
  numberInfinity: /[+-]?\.(?:inf|Inf|INF)/,
  numberNaN: /\.(?:nan|Nan|NAN)/,
  numberDate: /\d{4}-\d\d-\d\d([Tt ]\d\d:\d\d:\d\d(\.\d+)?(( ?[+-]\d\d?(:\d\d)?)|Z)?)?/,
  escapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
  tokenizer: {
    root: [
      { include: "@whitespace" },
      { include: "@comment" },
      // Directive
      [/%[^ ]+.*$/, "meta.directive"],
      // Document Markers
      [/---/, "operators.directivesEnd"],
      [/\.{3}/, "operators.documentEnd"],
      // Block Structure Indicators
      [/[-?:](?= )/, "operators"],
      { include: "@anchor" },
      { include: "@tagHandle" },
      { include: "@flowCollections" },
      { include: "@blockStyle" },
      // Numbers
      [/@numberInteger(?![ \t]*\S+)/, "number"],
      [/@numberFloat(?![ \t]*\S+)/, "number.float"],
      [/@numberOctal(?![ \t]*\S+)/, "number.octal"],
      [/@numberHex(?![ \t]*\S+)/, "number.hex"],
      [/@numberInfinity(?![ \t]*\S+)/, "number.infinity"],
      [/@numberNaN(?![ \t]*\S+)/, "number.nan"],
      [/@numberDate(?![ \t]*\S+)/, "number.date"],
      // Key:Value pair
      [/(".*?"|'.*?'|[^#'"]*?)([ \t]*)(:)( |$)/, ["type", "white", "operators", "white"]],
      { include: "@flowScalars" },
      // String nodes
      [
        /.+?(?=(\s+#|$))/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "string"
          }
        }
      ]
    ],
    // Flow Collection: Flow Mapping
    object: [
      { include: "@whitespace" },
      { include: "@comment" },
      // Flow Mapping termination
      [/\}/, "@brackets", "@pop"],
      // Flow Mapping delimiter
      [/,/, "delimiter.comma"],
      // Flow Mapping Key:Value delimiter
      [/:(?= )/, "operators"],
      // Flow Mapping Key:Value key
      [/(?:".*?"|'.*?'|[^,\{\[]+?)(?=: )/, "type"],
      // Start Flow Style
      { include: "@flowCollections" },
      { include: "@flowScalars" },
      // Scalar Data types
      { include: "@tagHandle" },
      { include: "@anchor" },
      { include: "@flowNumber" },
      // Other value (keyword or string)
      [
        /[^\},]+/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "string"
          }
        }
      ]
    ],
    // Flow Collection: Flow Sequence
    array: [
      { include: "@whitespace" },
      { include: "@comment" },
      // Flow Sequence termination
      [/\]/, "@brackets", "@pop"],
      // Flow Sequence delimiter
      [/,/, "delimiter.comma"],
      // Start Flow Style
      { include: "@flowCollections" },
      { include: "@flowScalars" },
      // Scalar Data types
      { include: "@tagHandle" },
      { include: "@anchor" },
      { include: "@flowNumber" },
      // Other value (keyword or string)
      [
        /[^\],]+/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "string"
          }
        }
      ]
    ],
    // First line of a Block Style
    multiString: [[/^( +).+$/, "string", "@multiStringContinued.$1"]],
    // Further lines of a Block Style
    //   Workaround for indentation detection
    multiStringContinued: [
      [
        /^( *).+$/,
        {
          cases: {
            "$1==$S2": "string",
            "@default": { token: "@rematch", next: "@popall" }
          }
        }
      ]
    ],
    whitespace: [[/[ \t\r\n]+/, "white"]],
    // Only line comments
    comment: [[/#.*$/, "comment"]],
    // Start Flow Collections
    flowCollections: [
      [/\[/, "@brackets", "@array"],
      [/\{/, "@brackets", "@object"]
    ],
    // Start Flow Scalars (quoted strings)
    flowScalars: [
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/'[^']*'/, "string"],
      [/"/, "string", "@doubleQuotedString"]
    ],
    doubleQuotedString: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"]
    ],
    // Start Block Scalar
    blockStyle: [[/[>|][0-9]*[+-]?$/, "operators", "@multiString"]],
    // Numbers in Flow Collections (terminate with ,]})
    flowNumber: [
      [/@numberInteger(?=[ \t]*[,\]\}])/, "number"],
      [/@numberFloat(?=[ \t]*[,\]\}])/, "number.float"],
      [/@numberOctal(?=[ \t]*[,\]\}])/, "number.octal"],
      [/@numberHex(?=[ \t]*[,\]\}])/, "number.hex"],
      [/@numberInfinity(?=[ \t]*[,\]\}])/, "number.infinity"],
      [/@numberNaN(?=[ \t]*[,\]\}])/, "number.nan"],
      [/@numberDate(?=[ \t]*[,\]\}])/, "number.date"]
    ],
    tagHandle: [[/\![^ ]*/, "tag"]],
    anchor: [[/[&*][^ ]+/, "namespace"]]
  }
};
export {
  p as conf,
  f as language
};
