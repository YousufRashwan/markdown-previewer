import { useState } from "react";

import Markdown from "marked-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMaximize,
  faMinimize,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

const defaultMarkdown = `# React Markdown Previewer

## Type your Markdown in the Editor!
<br><br>

### Main functionality

- Preview window updates real time with markdown syntax
- The editor has some predefined input on page load
- BONUS: Use &lt;br&gt; for line breaks

<br>

\`Is the syntax highlighting even working?\`
\`\`\`javascript
let s = "JavaScript syntax highlighting";
alert(s);
\`\`\`
<br>

> “If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.”
― Marcus Aurelius, Meditations 
<br>

![react logo](https://i.postimg.cc/Bv9y8sBZ/react-logo.png)
<br>

Coded by **Stahlone**, 2019 for [freeCodeCamp](https://www.freecodecamp.org) Front End Libraries Challenges
`;

const App = () => {
  const [editorState, setEditorState] = useState({
    content: defaultMarkdown,
    enlarged: false,
  });
  const [previewerState, setPreviewerState] = useState({
    enlarged: false,
  });
  const sizeToggle = (setElemState) => {
    setElemState((prevState) => ({
      ...prevState,
      enlarged: !prevState.enlarged,
    }));
  };

  return (
    <>
      {!previewerState.enlarged && (
        <div className="editor__container">
          <div className="editor__header">
            <div className="editor__heading">
              <FontAwesomeIcon icon={faMarkdown} />
              <h3>Editor</h3>
            </div>
            <button
              className="editor__button"
              onClick={() => sizeToggle(setEditorState)}
            >
              <FontAwesomeIcon
                icon={editorState.enlarged ? faMinimize : faMaximize}
              />
            </button>
          </div>
          <textarea
            name="editor"
            id="editor"
            className={`editor__textarea ${
              editorState.enlarged && "enlarged__editor__textarea"
            }`}
            // defaul
            value={editorState.content}
            onChange={(e) =>
              setEditorState({ ...editorState, content: e.target.value })
            }
          ></textarea>
        </div>
      )}

      {!editorState.enlarged && (
        <div className="editor__container">
          <div className="editor__header">
            <div className="editor__heading">
              <FontAwesomeIcon icon={faEye} />
              <h3>Previewer</h3>
            </div>
            <button
              className="editor__button"
              onClick={() => sizeToggle(setPreviewerState)}
            >
              <FontAwesomeIcon
                icon={previewerState.enlarged ? faMinimize : faMaximize}
              />
            </button>
          </div>
          <div
            name="editor"
            id="preview"
            className={`editor__textarea previewer ${
              previewerState.enlarged && "enlarged__previewer"
            }`}
          >
            <Markdown breaks="true">{editorState.content}</Markdown>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
