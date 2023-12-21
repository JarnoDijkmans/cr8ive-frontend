import { useState } from "react";
import '../styles/ContentInput.css'; 

function ContentInput ({name, value, updateFiles }) {
    const [files, setFiles] = useState(value|| []);
    const [currentIndex, setCurrentIndex] = useState(0);

    const selectFile = () => {
        const fileInput = document.getElementById('file-input');
        fileInput.click();
      };

      const handleFileChanged = (e) => {
        e.preventDefault();
        const newFiles = [...files, ...e.target.files];
        setFiles(newFiles);
        setCurrentIndex(newFiles.length - 1);
        updateFiles('content', newFiles);
    };

    const prevFile = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };
    
      const nextFile = () => {
        if (currentIndex < files.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      };

      const removeFile = (index) => {
        URL.revokeObjectURL(files[index].url);
        const newFiles = files.filter((file, i) => i !== index);
        setFiles(newFiles);

        if (newFiles.length > 0) {
            const newIndex = currentIndex > newFiles.length - 1 ? newFiles.length - 1 : currentIndex;
            setCurrentIndex(newIndex);
        } else {
            setCurrentIndex(0);
        }
        updateFiles('content', newFiles);
    };
   
    return (
      <div className="content-input-container"> 
          <button onClick={selectFile}>Add File</button>
          <input
              id="file-input"
              type="file"
              name="content"
              className="content-input"
              style={{ display: 'none' }}
              onChange={handleFileChanged}
              accept="image/*, video/*" 
          />
          {files.length > 0 && (
              <div className="current-file-container">
                  <h2>Current File:</h2>
                  {files[currentIndex].type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(files[currentIndex])} alt="Selected File" className="image" /> 
                  ) : (
                      <video controls src={URL.createObjectURL(files[currentIndex])} className="video" />
                  )}
                  <button className="Remove-button" onClick={() => removeFile(currentIndex)}>X</button>
              </div>
          )}
          {files.length > 1 && (
              <div className='Prev-Next-Button'>
                  <button onClick={prevFile} disabled={currentIndex === 0}>
                      Prev
                  </button>
                  <button onClick={nextFile} disabled={currentIndex === files.length - 1}>
                      Next
                  </button>
              </div>
          )}
          {files.length > 1 && (
              <div>
                  <h3>File List:</h3>
                  <ul>
                      {files.map((file, index) => (
                          <li key={index} onClick={() => setCurrentIndex(index)}>
                              {file.name} 
                          </li>
                      ))}
                  </ul>
              </div>
          )}
      </div>
  );
}

export default ContentInput;