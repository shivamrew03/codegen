import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import ClassStructure from '../components/ClassStructure';
import '../styles/ProjectPage.css';

const ProjectPage = () => {
  const [code, setCode] = useState('');
  const [classStructure, setClassStructure] = useState([]);
  const [language, setLanguage] = useState('cpp');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    
    // Parse the new code and update the class structure
    const updatedStructure = parseCode(newCode);
    setClassStructure(updatedStructure);
  };

  // Add this helper function to parse the code
  const parseCode = (code) => {
    // This is a basic implementation. You may need a more sophisticated parser
    // depending on the complexity of your code and supported languages.
    const classRegex = /class\s+(\w+)(?:\s+extends\s+(\w+))?\s*{([^}]*)}/g;
    const methodRegex = /(\w+)\s+(\w+)\s*\(([^)]*)\)/g;
    const attributeRegex = /(\w+)\s+(\w+);/g;

    const structure = [];
    let match;

    while ((match = classRegex.exec(code)) !== null) {
      const [, className, parentClass, classBody] = match;
      const classInfo = {
        name: className,
        parent: parentClass || '',
        methods: [],
        attributes: []
      };

      let methodMatch;
      while ((methodMatch = methodRegex.exec(classBody)) !== null) {
        const [, returnType, methodName, params] = methodMatch;
        classInfo.methods.push({
          name: methodName,
          returnType,
          params: params.split(',').map(p => p.trim()),
          override: classBody.includes(`@Override`) // Basic override detection
        });
      }

      let attrMatch;
      while ((attrMatch = attributeRegex.exec(classBody)) !== null) {
        const [, attrType, attrName] = attrMatch;
        classInfo.attributes.push({ name: attrName, type: attrType });
      }

      structure.push(classInfo);
    }

    return structure;
  };
  const handleAddClass = (className, parentClass) => {
    setClassStructure([...classStructure, { name: className, parent: parentClass, methods: [], attributes: [] }]);
  };

  const handleAddMethod = (className, methodName, returnType, methodType, params, override) => {
    const updatedStructure = classStructure.map(cls => {
      if (cls.name === className) {
        return {
          ...cls,
          methods: [...cls.methods, { name: methodName, returnType, methodType, params, override }]
        };
      }
      return cls;
    });
    setClassStructure(updatedStructure);
  };

  const handleAddAttribute = (className, attributeName, attributeType, initialValue) => {
    const updatedStructure = classStructure.map(cls => {
      if (cls.name === className) {
        return {
          ...cls,
          attributes: [...cls.attributes, { name: attributeName, type: attributeType, initialvalue: initialValue }]
        };
      }
      return cls;
    });
    setClassStructure(updatedStructure);
  };

  const handleUpdateCode = (newCode) => {
    setCode(newCode);
  };

  return (
    <div className="project-page">
      <div className="left-panel">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
          {/* <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option> */}
          <option value="cpp">C++</option>
        </select>
        <ClassStructure
          structure={classStructure}
          onAddClass={handleAddClass}
          onAddMethod={handleAddMethod}
          onAddAttribute={handleAddAttribute}
          onUpdateCode={handleUpdateCode}
          language={language}
        />
      </div>
      <div className="right-panel">
        <CodeEditor code={code} onChange={handleCodeChange} language={language} />
      </div>
    </div>
  );
};

export default ProjectPage;
