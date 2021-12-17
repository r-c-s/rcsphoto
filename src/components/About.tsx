import { useState } from 'react';
import PageHeader from './PageHeader';

function About() {
  document.title = 'About | RCS Photography';
  const [ready, setReady] = useState<boolean>();
  
  return <div id="about">
    <div className="container">
      <PageHeader title="About" subtitle={"by Raphael Corrêa"}/>
      <div className="body">
        <p>This is a portfolio for my photography, one of my biggest hobbies once upon a time.</p>
        <p>All images were taken with the Sony DSC-RX100 2 and 5 cameras.</p>
        <p>I shoot mostly in manual and record in raw format. I also use CaptureOne to edit my work.</p>
        <p>This website was written in React with Typescript. The pictures are uploaded on AWS S3 and served by AWS CloudFront, the album info is stored on IBM Cloudant, and the site is hosted on IBM CloudFoundry.</p>
        <p>The source code is on <a href='https://www.github.com/r-c-s/rcsphoto' target='_blank'>GitHub</a>.</p>
        <p>Thanks for viewing!</p>
        <div className="image-container">
          <img 
            src="me.jpg" 
            className={ready ? 'image-ready' : 'image-not-ready'} 
            onLoad={() => setReady(true)}/>
        </div>
      </div>
    </div>
  </div>;
}

export default About;