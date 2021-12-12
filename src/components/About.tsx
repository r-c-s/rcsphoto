import PageHeader from './PageHeader';

function About() {
  document.title = 'About | RCS Photography';
  
  return <div id="about">
    <div className="container">
      <PageHeader title="About" lines={["by Raphael Corrêa"]}/>
      <div className="body">
        <p>This is a portfolio for showcasing my photography, one of my biggest hobbies once upon a time.</p>
        <p>All images were taken using a Sony DSC-RX100 II and V cameras.</p>
        <p>I shoot mostly in manual and record in raw format. I also use CaptureOne to edit my work.</p>
        <p>This website was written in React with Typescript and uses the Twitter Bootstrap CSS framework. All photos are uploaded on Amazon S3 and served by CloudFront, the album info is stored on Cloudant DBaaS, and the site is hosted on IBM Bluemix.</p>
        <p>Thanks for viewing!</p>
        <p>The source code can be found on <a href='https://www.github.com/r-c-s/rcsphoto' target='_blank'>GitHub</a>.</p>
        <div className="image-container">
          <img src="me.jpg"/>
        </div>
      </div>
    </div>
  </div>;
}

export default About;