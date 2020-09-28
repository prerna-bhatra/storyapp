import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";
import './story.css';

function Storypage(props)
{

	const [title, setTitle] = useState('');
	const [descr, setDescr] = useState('');
	const [coverpic, setCoverpic] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [thumbnail, setThumbnail] = useState('');
	const [selected, setSelected] = useState(false)
	const user = useSelector(state => state.user);


	const fileChangeHandler = (event) => {
        console.log(event.target.files[0]);
        	setThumbnail(URL.createObjectURL(event.target.files[0]))
        	setSelected(true)
            
    }


	const handleSubmit = () => {
		setIsSubmitted(true);

		console.log(coverpic + ' ' + title);
		fetch('http://localhost:5000/api/story/addstory', {
			method:'POST',
			headers : {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userFrom:user.userData._id,
        		title:title,
        		descr:descr,
        		coverpic:coverpic

      		})
		})
		.then(res => {
	        if (res.status === 422) {
	          throw new Error('Validation failed.');
	        }
	        
	        return res.json();
      	})
      	.then(result => {
      		console.log(result);
      		setIsSubmitted(false);
      		window.location.reload(false);
      	})
	}

	
    return (
    	<div id="story">
    	<label>Title:</label>
    		<input type="text" onChange={(event) => {setTitle(event.target.value)}} />
    	<label>Story:</label>
    		<textarea onChange={(event) => {setDescr(event.target.value)}} />
    	<label>Cover Photo:</label>
    		 <input type="file" style={{display:'none'}}  onChange={fileChangeHandler} ref={chooseFile => chooseFile = chooseFile} accept="image/"/>

    		  <button  onClick={() => handleClick.click()}>
                                            Cover Image
                                       </button>

                                       {
                                        selected ?
	                                        <img src={thumbnail} height="100px" />
	                                        :
	                                        null
                                    	}

    	<button onClick={handleSubmit}>{isSubmitted ? 'Loading...' : 'Submit'}</button>
   		</div>
    	)
}

export default Storypage;