import { useState } from "react";
import '../styles/ContentInput.css'; 

function ContentInput ({name, value, addItem}) {
    const [files, setFiles] = useState(value|| []);
    const [currentIndex, setCurrentIndex] = useState(0);

    const selectFile = () => {
        const fileInput = document.getElementById('file-input');
        fileInput.click();
      };

      const handleFileChanged = (e) => {
        const newFiles = [...files, ...e.target.files];
        setFiles(newFiles);
        setCurrentIndex(newFiles.length - 1);
        addItem(name, newFiles);
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
                        <video controls src={URL.createObjectURL(files[currentIndex])} />
                    )}
                </div>
            )}
          {files.length > 1 &&(
          <div className='Prev-Next-Button'>
              <button onClick={prevFile} disabled={currentIndex === 0}>
                Prev
              </button>
              <button onClick={nextFile} disabled={currentIndex === files.length - 1}>
                Next
              </button>
          </div>
          )}
          
          {files.length > 1 &&(
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