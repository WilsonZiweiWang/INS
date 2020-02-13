import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

// Component to upload image 
const ImageUploader = (props) => {

  // init. 
  const imageUploaded = React.useRef(null);
  const imageUploader = React.useRef(null);

  // function to handle the uploading of image
  const imageUploadHandler = (e) => {
    const [file] = e.target.files; // e = event listener 

    if (file) {
      const reader = new FileReader(); // class helping us with uploading the picture
      const { current } = imageUploaded;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  // html rendered after calling the ImageUploader 
  return (
    <div id='imageLoader' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >

      <input type="file" accept="image/*" onChange={imageUploadHandler} ref={imageUploader} style={{ display: "none" }} />

      <div className='left' style={{ height: "200px", width: "200px", border: "1px dashed black" }} onClick={() => imageUploader.current.click()} >

        <img ref={imageUploaded} style={{ width: "100%", height: "100%", position: "acsolute" }} />

      </div>

      Click to Upload Image

    </div>
  );
}

export default withRouter(ImageUploader);