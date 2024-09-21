import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import ClassStructure from '../components/ClassStructure';

const ProjectPage = () => {
  const [code, setCode] = useState('');
  const [classStructure, setClassStructure] = useState([]);
  const [language, setLanguage] = useState('cpp');

  const handleCodeChange = (newCode) => {
    setCode(newCode);

    const updatedStructure = parseCode(newCode);
    setClassStructure(updatedStructure);
  };

  const parseCode = (code) => {
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
          override: classBody.includes(`@Override`)
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
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-2/5 min-w-[300px] border-r border-gray-200 p-5 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 rounded-lg text-lg text-white"
        >
          <option value="cpp">C++</option>
        </select>

        {/* Class Structure */}
        <ClassStructure
          structure={classStructure}
          onAddClass={handleAddClass}
          onAddMethod={handleAddMethod}
          onAddAttribute={handleAddAttribute}
          onUpdateCode={handleUpdateCode}
          language={language}
        />
      </div>

      {/* Right Panel */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <CodeEditor code={code} onChange={handleCodeChange} language={language} />
      </div>
    </div>
  );
};

export default ProjectPage;
