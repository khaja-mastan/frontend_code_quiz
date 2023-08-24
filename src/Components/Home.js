import React, { useRef, useState } from "react";
import "./Home.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [userId, setUseRId] = useState("");
  const [resumeName, setResumeName] = useState(
    localStorage.getItem("resumeName") || "");
  const [resumeFile, setResumeFile] = useState(
    localStorage.getItem("resumeFile") || "");

  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    const name =selectedFile.name
    console.log("submitted", selectedFile);
    if (selectedFile) {
      setResumeName(selectedFile.name);
      localStorage.setItem("resumeName", name);
      const form = new FormData();
      form.append("file", selectedFile);
      axios
        .post("http://localhost:8001/api/resume", form)
        .then((res) => {
          console.log(res.data._id);
          console.log("file....!",res.data.file);
          const file = res.data.file;
          setResumeFile(file);
          localStorage.setItem("resumeFile", file);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleRemove = async() => {
    setResumeName("");
    setResumeFile("");
    localStorage.removeItem("resumeFile");
    localStorage.removeItem("resumeName");
    console.log(resumeFile);
    console.log(resumeName);
     await axios.delete("http://localhost:8001/api/resume", {
        data: { resumeFile: resumeFile }, // Pass the object directly
      })  
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  //---if we want to gat resume then to use this api ----start
  // Fetch resumes
  // const fetchResumes = async () => {
  //   try {
  //       const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOSTNAME}/api/resumes`);
  //       const resumes = response.data;
  //       // Process resumes as needed
  //       console.log(resumes);
  //   } catch (error) {
  //       console.error('Error fetching resumes:', error);
  //   }
  // };

  // // Call the fetchResumes function wherever you need it
  // fetchResumes();
  //------end---

  return (
    <>
      <div className="container">
        <div className="box-content">
          <h1 id="heading">
            Thank you for Your Interest to be a Certified Scrum Master !
          </h1>
          <h5 id="h5">
            In order for you to complete your cetification you must full fill
            the below criteria :
          </h5>
          <ol id="ol" type="1">
            <li id=""> 1.You should acheive a minimum passing score of 50%</li>
            <li> 2.You should Complete this Test within the next 24 Hours</li>
          </ol>
          <h5 id="hh5">
            The test duration is for 2 hours and you will have to complete 30
            multiple choice questions
          </h5>
          <div className="details-1">
            <label className="resume-label">
              Upload Resume :
              <input
                className="resume-input" placeholder="Upload Resume"
                type="file"
                onChange={handleChange}
              />
            </label>
            {resumeName && (
              <div>
                <p>{resumeName}</p>
                <button onClick={handleRemove}>Remove</button>
              </div>
            )}
          </div>
          <div className="but">
            <Link id="butt" to="/quiz">
              Click here to start the test, all the very best !!
            </Link>
          </div>
        </div>
        <div className="box-logo">
          <div className="box-1"></div>
          <div className="box-2">
            <div className="logo">
              <img
                className="logo-image"
                src={require("../Components/Images/logo1.png")}
                alt="logo"
              />
              <h1 id="tag">TAGLET</h1>
              <h3 id="con">CONSULTING</h3>
              <Link id="link" to="/">
                www.tagletconsulting.com
              </Link>
            </div>
          </div>
          <div className="box-3"></div>
          <div className="box-4"></div>
        </div>
      </div>
    </>
  );
};
export default Home;
