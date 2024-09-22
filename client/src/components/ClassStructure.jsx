import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaPlus, FaMinus, FaTrash  } from 'react-icons/fa';

const ClassStructure = ({ structure, onAddClass, onUpdateClass, onDeleteClass }) => {
  const [expandedClasses, setExpandedClasses] = useState({});
  const [newClassName, setNewClassName] = useState('');
  const [newClassParent, setNewClassParent] = useState('');

  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeType, setNewAttributeType] = useState('int');
  const [newAttributeAccess, setNewAttributeAccess] = useState('public');
  const [newAttributeDefaultValue, setNewAttributeDefaultValue] = useState('');

  const [newMethodName, setNewMethodName] = useState('');
  const [newMethodReturnType, setNewMethodReturnType] = useState('void');
  const [newMethodAccess, setNewMethodAccess] = useState('public');
  const [newMethodParams, setNewMethodParams] = useState('');

  const [newInheritanceType, setNewInheritanceType] = useState('public');


  const dataTypes = ['int', 'bool', 'string', 'char', 'long long', 'double', 'float', 'void'];

  const toggleClass = (className) => {
    setExpandedClasses(prev => ({
      ...prev,
      [className]: !prev[className],
    }));
  };

  const handleAddClass = () => {
    if (newClassName) {
      if (newClassParent) {
        const parentClass = structure.find(cls => cls.name === newClassParent);
        if (!parentClass) {
          alert(`Parent class "${newClassParent}" does not exist.`);
          return;
        }
      }
      const newClass = {
        name: newClassName,
        parent: newClassParent,
        inheritanceType: newInheritanceType,
        public: { attributes: [], methods: [] },
        private: { attributes: [], methods: [] },
        protected: { attributes: [], methods: [] },
      };
      onAddClass(newClass);
      setNewClassName('');
      setNewClassParent('');
      setNewInheritanceType('public');
    }
  };


  const handleAddAttribute = (className) => {
    const updatedClass = structure.find(cls => cls.name === className);
    if (updatedClass[newAttributeAccess].attributes.some(attr => attr.name === newAttributeName)) {
      alert('An attribute with this name already exists in this class.');
      return;
    }
    updatedClass[newAttributeAccess].attributes.push({
      name: newAttributeName,
      type: newAttributeType,
      defaultValue: newAttributeDefaultValue
    });
    onUpdateClass(updatedClass);
    setNewAttributeName('');
    setNewAttributeDefaultValue('');
  };

  const handleAddMethod = (className) => {
    const updatedClass = structure.find(cls => cls.name === className);
    const params = newMethodParams.split(',').map(param => param.trim());
    if (updatedClass[newMethodAccess].methods.some(method =>
      method.name === newMethodName && method.params.join(',') === params.join(',')
    )) {
      alert('A method with this signature already exists in this class.');
      return;
    }
    updatedClass[newMethodAccess].methods.push({
      name: newMethodName,
      returnType: newMethodReturnType,
      params: params
    });
    onUpdateClass(updatedClass);
    setNewMethodName('');
    setNewMethodParams('');
  };

  const getInheritedMembers = (classItem) => {
    if (!classItem.parent) return { public: [], protected: [], private: [] };
    const parentClass = structure.find(cls => cls.name === classItem.parent);
    if (!parentClass) return { public: [], protected: [], private: [] };

    const inheritedPublic = [...(parentClass.public?.attributes || []), ...(parentClass.public?.methods || [])];
    const inheritedProtected = [...(parentClass.protected?.attributes || []), ...(parentClass.protected?.methods || [])];

    const parentInherited = getInheritedMembers(parentClass);

    return {
      public: [...parentInherited.public, ...inheritedPublic],
      protected: [...parentInherited.protected, ...inheritedProtected],
      private: []
    };
  };



  const handleDeleteMember = (className, access, type, name, params = []) => {
    const updatedClass = structure.find(cls => cls.name === className);
    if (type === 'attribute') {
      updatedClass[access].attributes = updatedClass[access].attributes.filter(attr => attr.name !== name);
    } else if (type === 'method') {
      updatedClass[access].methods = updatedClass[access].methods.filter(method =>
        !(method.name === name && method.params.join(',') === params.join(','))
      );
    }
    onUpdateClass(updatedClass);
  };

  const renderMembers = (classItem, access) => {
    const inheritedMembers = getInheritedMembers(classItem);
    return (
      <div>
        <h4>{access}</h4>
        {inheritedMembers[access].map(member => (
          <div key={`inherited-${member.name}`} className="member-item text-gray-400 italic">
            <FaFile className="inline-block mr-2" /> {member.type || member.returnType} {member.name} (inherited)
          </div>
        ))}
        {classItem[access]?.attributes?.map(attr => (
          <div key={attr.name} className="attribute-item text-gray-400">
            <FaFile className="inline-block mr-2" /> {attr.type} {attr.name}
            <button onClick={() => handleDeleteMember(classItem.name, access, 'attribute', attr.name)} className="ml-2 text-red-500"><FaMinus /></button>
          </div>
        ))}
        {classItem[access]?.methods?.map(method => (
          <div key={`${method.name}(${method.params.join(',')})`} className="method-item text-gray-400">
            <FaFile className="inline-block mr-2" /> {method.returnType} {method.name}({method.params.join(', ')})
            <button onClick={() => handleDeleteMember(classItem.name, access, 'method', method.name, method.params)} className="ml-2 text-red-500"><FaMinus /></button>
          </div>
        ))}
      </div>
    );
  };



  const renderClass = (classItem) => {
    const isExpanded = expandedClasses[classItem.name];
    return (
      <div key={classItem.name} className="class-item group transition-transform transform hover:scale-105 hover:bg-gray-700 p-2 rounded-md">
        <div className="flex justify-between items-center">
          <div onClick={() => toggleClass(classItem.name)} className="class-header cursor-pointer flex items-center space-x-2 text-lg text-gray-300 group-hover:text-white">
            {isExpanded ? <FaFolderOpen /> : <FaFolder />} <span>{classItem.name}</span>
          </div>
          <button onClick={() => onDeleteClass(classItem.name)} className="text-red-500 hover:text-red-700">
            <FaTrash /> Delete
          </button>
        </div>
        {isExpanded && (
          <div className="class-content ml-5 mt-2">
            {['private', 'protected', 'public'].map(access => renderMembers(classItem, access))}
            <div className="add-attribute flex items-center mt-2">
              <input
                type="text"
                value={newAttributeName}
                onChange={(e) => setNewAttributeName(e.target.value)}
                placeholder="Attribute Name"
                className="text-black p-1 rounded mr-2"
              />
              <select
                value={newAttributeType}
                onChange={(e) => setNewAttributeType(e.target.value)}
                className="text-black p-1 rounded mr-2"
              >
                {dataTypes.filter(type => type !== 'void').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={newAttributeAccess}
                onChange={(e) => setNewAttributeAccess(e.target.value)}
                className="text-black p-1 rounded mr-2"
              >
                <option value="private">Private</option>
                <option value="protected">Protected</option>
                <option value="public">Public</option>
              </select>
              <input
                type="text"
                value={newAttributeDefaultValue}
                onChange={(e) => setNewAttributeDefaultValue(e.target.value)}
                placeholder="Default Value"
                className="text-black p-1 rounded mr-2"
              />
              <button onClick={() => handleAddAttribute(classItem.name)} className="bg-blue-500 text-white p-1 rounded">
                <FaPlus /> Add Attribute
              </button>
            </div>
            <div className="add-method flex items-center mt-2">
              <input
                type="text"
                value={newMethodName}
                onChange={(e) => setNewMethodName(e.target.value)}
                placeholder="Method Name"
                className="text-black p-1 rounded mr-2"
              />
              <select
                value={newMethodReturnType}
                onChange={(e) => setNewMethodReturnType(e.target.value)}
                className="text-black p-1 rounded mr-2"
              >
                {dataTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={newMethodAccess}
                onChange={(e) => setNewMethodAccess(e.target.value)}
                className="text-black p-1 rounded mr-2"
              >
                <option value="private">Private</option>
                <option value="protected">Protected</option>
                <option value="public">Public</option>
              </select>
              <input
                type="text"
                value={newMethodParams}
                onChange={(e) => setNewMethodParams(e.target.value)}
                placeholder="Parameters (comma-separated)"
                className="text-black p-1 rounded mr-2"
              />
              <button onClick={() => handleAddMethod(classItem.name)} className="bg-green-500 text-white p-1 rounded">
                <FaPlus /> Add Method
              </button>
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
        <select
          value={newInheritanceType}
          onChange={(e) => setNewInheritanceType(e.target.value)}
          className="text-black p-1 rounded mr-2"
        >
          <option value="public">Public</option>
          <option value="protected">Protected</option>
          <option value="private">Private</option>
        </select>
        <button onClick={handleAddClass} className="bg-green-500 text-white p-1 rounded"><FaPlus /> Add Class</button>
      </div>
    </div>
  );
};

export default ClassStructure;


