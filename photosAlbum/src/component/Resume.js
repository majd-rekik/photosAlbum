import React  from 'react';
import "./../App.css";
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const social = [
   {
     name:"facebook",
     url:"https://www.facebook.com/majd.rekik/",
     icon: <FacebookIcon/>
   }, 
   {
     name:"linkedin",
     url:"https://www.linkedin.com/in/majd-rekik-20818ba7/", 
     icon:  <LinkedInIcon/>
   },
   {
     name:"github",
     url:"https://github.com/majd-rekik",
     icon: <GitHubIcon/>
   },
 ]


function Resume() {

      const networks= social.map(function(network){
        return <li key={network.name}><a href={network.url}>{network.icon}</a></li>
      })
    

    return (
      <div id="home">

      <div className="row banner">
         <div className="banner-text">
            <h1 className="responsive-headline">I'm Majd Rekik </h1>
            <h3>I'm a Berlin based <span>Studentand junior Web developer</span>. Performance-driven ambitious Jr. Web Developer motivated to meet all web-based needs. Assisted in development and testing of web-based applications in NodeJs, React, GraphQL. Consistently recognized for problem-solving and multi-tasking skills. Proficient with Javascript, HTML and CSS.</h3>
            <hr />
            <ul className="social">
               {networks}
            </ul>
         </div>
      </div>
   </div>
    );
  }

export default Resume;
