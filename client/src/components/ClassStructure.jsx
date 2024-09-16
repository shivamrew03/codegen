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
      onAddMethod(className, newMethodName, newMethodReturnType, newMethodParams.split(',').map(p => p.trim()), newMethodOverride);
      setNewMethodName('');
      setNewMethodReturnType('void');
      setNewMethodParams('');
      setNewMethodOverride(false);
    }
  };

  const handleAddAttribute = (className) => {
    if (newAttributeName) {
      onAddAttribute(className, newAttributeName, newAttributeType);
      setNewAttributeName('');
      setNewAttributeType('int');
    }
  };

  const updateCodeEditor = () => {
    let codeString = '';
    structure.forEach(classItem => {
      switch (language) {
        case 'javascript':
          codeString += `class ${classItem.name}${classItem.parent ? ` extends ${classItem.parent}` : ''} {\n`;
          classItem.attributes.forEach(attr => {
            codeString += `  ${attr.name}${attr.initialValue ? ` = ${attr.initialValue}` : ''};\n`;
          });
          classItem.methods.forEach(method => {
            codeString += `  ${method.name}(${method.params.join(', ')}) {\n    // TODO: Implement method\n  }\n`;
          });
          codeString += '}\n\n';
          break;
    
        case 'python':
          codeString += `class ${classItem.name}${classItem.parent ? `(${classItem.parent})` : ''}:\n`;
          classItem.attributes.forEach(attr => {
            codeString += `    ${attr.name}${attr.initialValue ? ` = ${attr.initialValue}` : ''}\n`;
          });
          classItem.methods.forEach(method => {
            codeString += `    def ${method.name}(self, ${method.params.join(', ')}):\n        # TODO: Implement method\n        pass\n`;
          });
          codeString += '\n';
          break;
    
        case 'cpp':
          codeString += `class ${classItem.name}${classItem.parent ? ` : public ${classItem.parent}` : ''} {\npublic:\n`;
          classItem.attributes.forEach(attr => {
            codeString += `    ${attr.type} ${attr.name}${attr.initialValue ? ` = ${attr.initialValue}` : ''};\n`;
          });
          classItem.methods.forEach(method => {
            codeString += `    ${method.returnType} ${method.name}(${method.params.map(param => `${param.type} ${param.name}`).join(', ')}) {\n        // TODO: Implement method\n    }\n`;
          });
          codeString += '};\n\n';
          break;
    
        case 'java':
          codeString += `public class ${classItem.name}${classItem.parent ? ` extends ${classItem.parent}` : ''} {\n`;
          classItem.attributes.forEach(attr => {
            codeString += `    private ${attr.type} ${attr.name}${attr.initialValue ? ` = ${attr.initialValue}` : ''};\n`;
          });
          classItem.methods.forEach(method => {
            codeString += `    public ${method.returnType} ${method.name}(${method.params.map(param => `${param.type} ${param.name}`).join(', ')}) {\n        // TODO: Implement method\n    }\n`;
          });
          codeString += '}\n\n';
          break;
    
      }
    });
    onUpdateCode(codeString);
  };
  

  const renderClass = (classItem) => {
    const isExpanded = expandedClasses[classItem.name];
    return (
      <div key={classItem.name} className="class-item">
        <div onClick={() => toggleClass(classItem.name)} className="class-header">
          {isExpanded ? <FaFolderOpen /> : <FaFolder />} {classItem.name}
        </div>
        {isExpanded && (
          <div className="class-content">
            {classItem.attributes.map(attr => (
              <div key={attr.name} className="attribute-item">
                <FaFile /> {attr.type} {attr.name}
              </div>
            ))}
            {classItem.methods.map(method => (
              <div key={method.name} className="method-item">
                <FaFile /> {method.returnType} {method.name}({method.params.join(', ')})
              </div>
            ))}
            <div className="add-attribute">
              <input
                type="text"
                value={newAttributeName}
                onChange={(e) => setNewAttributeName(e.target.value)}
                placeholder="Attribute name"
              />
              <select value={newAttributeType} onChange={(e) => setNewAttributeType(e.target.value)}>
                <option value="int">int</option>
                <option value="bool">bool</option>
                <option value="char">char</option>
                <option value="String">String</option>
                <option value="float">float</option>
                <option value="double">double</option>
              </select>
              <button onClick={() => handleAddAttribute(classItem.name)}><FaPlus /> Add Attribute</button>
            </div>
            <div className="add-method">
              <input
                type="text"
                value={newMethodName}
                onChange={(e) => setNewMethodName(e.target.value)}
                placeholder="Method name"
              />
              <input
                type="text"
                value={newMethodReturnType}
                onChange={(e) => setNewMethodReturnType(e.target.value)}
                placeholder="Return type"
              />
              <input
                type="text"
                value={newMethodParams}
                onChange={(e) => setNewMethodParams(e.target.value)}
                placeholder="Parameters (comma-separated)"
              />
              <label>
                <input
                  type="checkbox"
                  checked={newMethodOverride}
                  onChange={(e) => setNewMethodOverride(e.target.checked)}
                />
                Override
              </label>
              <button onClick={() => handleAddMethod(classItem.name)}><FaPlus /> Add Method</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="class-structure">
      {structure.map(renderClass)}
      <div className="add-class">
        <input
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="Class name"
        />
        <input
          type="text"
          value={newClassParent}
          onChange={(e) => setNewClassParent(e.target.value)}
          placeholder="Parent class (optional)"
        />
        <button onClick={handleAddClass}><FaPlus /> Add Class</button>
      </div>
    </div>
  );
};

export default ClassStructure;
