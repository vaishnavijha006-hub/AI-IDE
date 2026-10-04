import { useState } from "react";
import Editor from "@monaco-editor/react";

function App() {
  const [projectPath, setProjectPath] = useState("");
  const [files, setFiles] = useState([]);
  const [code, setCode] = useState(
`function hello() {
  console.log("Hello from AI-IDE");
}

hello();`
  );

  const openFolder = async () => {
    const folder = await window.api.openFolder();

    if (!folder) return;

    setProjectPath(folder);

    const directory = await window.api.readDirectory(folder);
    setFiles(directory);
  };

  const openFile = async (file) => {
    if (file.isDirectory) return;

    const separator = projectPath.includes("\\") ? "\\" : "/";
    const filePath = `${projectPath}${separator}${file.name}`;

    const content = await window.api.readFile(filePath);
    setCode(content);
  };

  return (
    <div className="ide">
      <header className="topbar">
        <div className="logo">AI-IDE</div>

        <div className="actions">
          <button onClick={openFolder}>📁 Open Folder</button>
          <button>▶ Run</button>
          <button>⚙</button>
        </div>
      </header>

      <main className="workspace">
        <aside className="sidebar">
          <h3>EXPLORER</h3>

          {projectPath && (
            <div className="project-path">
              {projectPath}
            </div>
          )}

          {files.map((file) => (
            <div
              key={file.name}
              className="file"
              onClick={() => openFile(file)}
            >
              {file.isDirectory ? "📁" : "📄"} {file.name}
            </div>
          ))}
        </aside>

        <section className="editor">
          <div className="tab">Editor</div>

          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </section>

        <aside className="ai-panel">
          <h3>AI ASSISTANT</h3>

          <div className="ai-message">
            👋 Hi! I'm your coding assistant.
            <br />
            <br />
            Open a project and ask me about your code.
          </div>

          <div className="chat-box">
            <input placeholder="Ask AI..." />
            <button>Send</button>
          </div>
        </aside>
      </main>

      <footer className="terminal">
        <div className="terminal-title">TERMINAL</div>
        <div className="terminal-content">
          $ Ready...
        </div>
      </footer>
    </div>
  );
}

export default App;