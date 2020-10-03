import React from 'react';
import './Panels.css';
import Image from '../components/Image'
import reciprocity_logo from 'shared/img/reciprocity_logo.png'

function AboutPanel() {
    return (
    <div className="grid-container-content">
      <div className="header">
        <div>
            <h2>About</h2>
        </div>
      </div>
      <div className="content about_content">
        <div>
          <Image src={reciprocity_logo} alt="Reciprocity" width="300" height="300"/>
        </div>
        <div>
          <p>Reciprocity Core</p>
          <p>© 2019 Anthony Buckle, April Buckle</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPanel;
