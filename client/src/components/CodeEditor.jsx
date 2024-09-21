import React from 'react';
import Editor from "@monaco-editor/react";
import { FaCopy } from 'react-icons/fa';

const CodeEditor = ({ code, onChange, language }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="code-editor">
      <div >
        <button onClick={handleCopy} className="copy-button">
          <FaCopy /> Copy Code
        </button>
      </div>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default CodeEditor;
