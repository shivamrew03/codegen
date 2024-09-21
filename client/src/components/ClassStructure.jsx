import React, { useState, useEffect } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaPlus } from 'react-icons/fa';

const ClassStructure = ({ structure, onAddClass, onAddMethod, onAddAttribute, onUpdateCode, language }) => {
  const [expandedClasses, setExpandedClasses] = useState({});
  const [newClassName, setNewClassName] = useState('');
  const [newClassParent, setNewClassParent] = useState('');
  const [newMethodName, setNewMethodName] = useState('');
  const [newMethodReturnType, setNewMethodReturnType] = useState('void');
  const [newMethodParams, setNewMethodParams] = useState('');
  const [newMethodOverride, setNewMethodOverride] = useState(false);
  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeType, setNewAttributeType] = useState('int');
  const [initialValue, setInitialValue] = useState('');
  const [newMethodType, setNewMethodType] = useState('');

  useEffect(() => {
    updateCodeEditor();
  }, [structure]);

  const toggleClass = (className) => {
    setExpandedClasses({
      ...expandedClasses,
      [className]: !expandedClasses[className],
    });
  };

  const handleAddClass = () => {
    if (newClassName) {
      onAddClass(newClassName, newClassParent);
      setNewClassName('');
      setNewClassParent('');
    }
  };

  const handleAddMethod = (className) => {
    if (newMethodName) {
      onAddMethod(className, newMethodName, newMethodReturnType, newMethodType, newMethodParams, newMethodOverride);
      setNewMethodName('');
      setNewMethodReturnType('void');
      setNewMethodParams('');
      setNewMethodType('')
      setNewMethodOverride(false);
    }
  };

  const handleAddAttribute = (className) => {
    if (newAttributeName) {
      onAddAttribute(className, newAttributeName, newAttributeType, initialValue);
      setNewAttributeName('');
      setNewAttributeType('int');
      setInitialValue('');
    }
  };

  const updateCodeEditor = () => {
    let codeString = '';
    structure.forEach(classItem => {
      switch (language) {
        case 'cpp':
          codeString += `class ${classItem.name}${classItem.parent ? ` : public ${classItem.parent}` : ''} {\npublic:\n`;
          classItem.attributes.forEach(attr => {
            codeString += `    ${attr.type} ${attr.name}${attr.initialvalue ? ` = ${attr.initialvalue}` : ''};\n`;
          });
          classItem.methods.forEach(method => {
            if(method.override){
              codeString += `    @override`
            }
            codeString += `\n   ${method.methodType} ${method.returnType}  ${method.name}(${method.params}) {\n        // TODO: Implement method\n    }\n`;
          });
          codeString += '};\n\n';
          break;
      }
    });
    onUpdateCode(codeString);
  };

  const renderClass = (classItem) => {
    const isExpanded = expandedClasses[classItem.name];
    return (
      <div key={classItem.name} className="class-item group transition-transform transform hover:scale-105 hover:bg-gray-700 p-2 rounded-md">
        <div onClick={() => toggleClass(classItem.name)} className="class-header cursor-pointer flex items-center space-x-2 text-lg text-gray-300 group-hover:text-white">
          {isExpanded ? <FaFolderOpen /> : <FaFolder />} <span>{classItem.name}</span>
        </div>
        {isExpanded && (
          <div className="class-content ml-5 mt-2">
            {classItem.attributes.map(attr => (
              <div key={attr.name} className="attribute-item text-gray-400">
                <FaFile className="inline-block mr-2" /> {attr.type} {attr.name}
              </div>
            ))}
            {classItem.methods.map(method => (
              <div key={method.name} className="method-item text-gray-400">
                <FaFile className="inline-block mr-2" /> {method.methodType} {method.returnType} {method.name}({method.params})
              </div>
            ))}
            <div className="add-attribute flex items-center mt-2">
              <input
                type="text"
                value={newAttributeName}
                onChange={(e) => setNewAttributeName(e.target.value)}
                placeholder="Attribute name"
                className="text-black p-1 rounded mr-2"
              />
              <select value={newAttributeType} onChange={(e) => setNewAttributeType(e.target.value)} className="text-black p-1 rounded mr-2">
                <option value="int">int</option>
                <option value="bool">bool</option>
                <option value="char">char</option>
                <option value="String">String</option>
                <option value="float">float</option>
                <option value="double">double</option>
              </select>
              <input
                type="text"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                placeholder="Default Value"
                className="text-black p-1 rounded mr-2"
              />
              <button onClick={() => handleAddAttribute(classItem.name)} className="bg-blue-500 text-white p-1 rounded"><FaPlus /> Add Attribute</button>
            </div>
            <div className="add-method flex items-center mt-2">
              <input
                type="text"
                value={newMethodName}
                onChange={(e) => setNewMethodName(e.target.value)}
                placeholder="Method name"
                className="text-black p-1 rounded mr-2"
              />
              <select value={newMethodReturnType} onChange={(e) => setNewMethodReturnType(e.target.value)} className="text-black p-1 rounded mr-2">
                <option value="int">int</option>
                <option value="bool">bool</option>
                <option value="char">char</option>
                <option value="String">String</option>
                <option value="float">float</option>
                <option value="double">double</option>
                <option value="void">void</option>
              </select>
              <select value={newMethodType} onChange={(e) => setNewMethodType(e.target.value)} className="text-black p-1 rounded mr-2">
                <option value="N/A">N/A</option>
                <option value="virtual">virtual</option>
                <option value="private">private</option>
                <option value="public">public</option>
              </select>
              <input
                type="text"
                value={newMethodParams}
                onChange={(e) => setNewMethodParams(e.target.value)}
                placeholder="Parameters (comma-separated)"
                className="text-black p-1 rounded mr-2"
              />
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={newMethodOverride}
                  onChange={(e) => setNewMethodOverride(e.target.checked)}
                  className="mr-1"
                />
                Override
              </label>
              <button onClick={() => handleAddMethod(classItem.name)} className="bg-blue-500 text-white p-1 rounded"><FaPlus /> Add Method</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="class-structure p-3 bg-gradient-to-b from-gray-900 to-gray-800 h-full text-white">
      {structure.map(renderClass)}
      <div className="add-class flex items-center mt-4">
        <input
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="Class name"
          className="text-black p-1 rounded mr-2"
        />
        <input
          type="text"
          value={newClassParent}
          onChange={(e) => setNewClassParent(e.target.value)}
          placeholder="Parent class (optional)"
          className="text-black p-1 rounded mr-2"
        />
        <button onClick={handleAddClass} className="bg-green-500 text-white p-1 rounded"><FaPlus /> Add Class</button>
      </div>
    </div>
  );
};

export default ClassStructure;
