import React, { useState, useEffect } from 'react';
import CodeEditor from '../components/CodeEditor';
import ClassStructure from '../components/ClassStructure';

const ProjectPage = () => {
  const [classStructure, setClassStructure] = useState(() => {
    const savedStructure = localStorage.getItem('classStructure');
    return savedStructure ? JSON.parse(savedStructure) : [];
  });

  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage ? savedLanguage : 'cpp';
  });

  useEffect(() => {
    localStorage.setItem('classStructure', JSON.stringify(classStructure));
  }, [classStructure]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const handleAddClass = (newClass) => {
    if (classStructure.some(cls => cls.name === newClass.name)) {
      alert('A class with this name already exists.');
      return;
    }
    setClassStructure([...classStructure, newClass]);
  };

  const handleUpdateClass = (updatedClass) => {
    setClassStructure(classStructure.map(cls => 
      cls.name === updatedClass.name ? updatedClass : cls
    ));
  };

  const handleDeleteClass = (className) => {
    setClassStructure(classStructure.filter(cls => cls.name !== className));
  };

  const deleteClass = (className) => {
    const classesToDelete = [className];
    const findDescendants = (parentName) => {
      classStructure.forEach(cls => {
        if (cls.parent === parentName) {
          classesToDelete.push(cls.name);
          findDescendants(cls.name);
        }
      });
    };
    findDescendants(className);
    
    setClassStructure(prevStructure => 
      prevStructure.filter(cls => !classesToDelete.includes(cls.name))
    );
  };
  

  const generateCode = () => {
    let code = '';
    classStructure.forEach(cls => {
      code += `class ${cls.name}${cls.parent ? ` : ${cls.inheritanceType} ${cls.parent}` : ''} {\n`;
      ['private', 'protected', 'public'].forEach(access => {
        if (cls[access].attributes.length > 0 || cls[access].methods.length > 0) {
          code += `${access}:\n`;
          cls[access].attributes.forEach(attr => {
            code += `    ${attr.type} ${attr.name}${attr.defaultValue ? ` = ${attr.defaultValue}` : ''};\n`;
          });
          cls[access].methods.forEach(method => {
            code += `    ${method.returnType} ${method.name}(${method.params.join(', ')}) {\n`;
            code += `        // TODO: Implement method\n`;
            code += `    }\n`;
          });
        }
      });
      code += '};\n\n';
    });
    return code;
  };
  
  // localStorage.clear();
  return (
    <div className="pt-[64px] flex h-screen overflow-hidden">
      <div className="w-2.25/5 min-w-[300px] border-r border-gray-200 p-5 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 rounded-lg text-lg text-white"
        >
          <option value="cpp">C++</option>
        </select>
        <ClassStructure
          structure={classStructure}
          onAddClass={handleAddClass}
          onUpdateClass={handleUpdateClass}
          onDeleteClass={deleteClass}
        />
      </div>
      <div className="flex-grow flex flex-col overflow-hidden">
        <CodeEditor code={generateCode()} language={language} />
      </div>
    </div>
  );
};

export default ProjectPage;
