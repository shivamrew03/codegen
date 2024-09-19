import React from 'react';
import Editor from "@monaco-editor/react";
import { FaCopy } from 'react-icons/fa';

const CodeEditor = ({ code, onChange, language }) => {
  console.log(language);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    console.log(newCode);
    // Parse the new code and update the class structure
    const updatedStructure = parseCode(newCode);
    setClassStructure(updatedStructure);
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
        value = {code}
        onChange={handleCodeChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default CodeEditor;
