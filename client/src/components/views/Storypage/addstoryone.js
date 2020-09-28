import React, { Component } from 'react';
import firebase from "./firebase";
import './story.css';
class AddStory extends Component {
	constructor() {
		super();
		this.state = {
			title:'',
			descr:'',
			coverimage:'',
			selected:false,
			isLoading:false,
			thumblink:'',
		}
	}


	fileChangeHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            thumblink: URL.createObjectURL(event.target.files[0]),
            selected : true
        })
    }


    handleSubmit=async()=>{
        this.setState({isLoading : true})
        const response = await fetch(this.state.thumblink)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child('thumbnail/' + this.state.thumblink)
        return ref.put(blob)
        .then(()=>{
            ref.getDownloadURL().then((url)=>{
                console.log(url)

                this.setState({
                    coverpic: url
                })
                fetch('http://localhost:5000/api/story/addstory', {
						method:'POST',
						headers : {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							userFrom:'abc',
			        		title:this.state.title,
			        		descr:this.state.descr,
			        		coverpic:this.state.coverpic

			      		})
					})
                	.then(result => {
			            result.json().then(response => {
                        console.log(response);
                        this.setState({
                            isLoading: false
                        })
                        alert('Success')
                        window.location.reload(false);
                       
                    })
                }).catch(err => {
                    alert("Something went wrong")
                    this.setState({
                        loading: false,
                        error: err
                    });
                });  
            })
        })
    }


	

	render(){
		return (
			
				<div id="story">
				<div>
			    	
			    		<input placeholder="Type title here" type="text" onChange={(event) => {this.setState({title:event.target.value})}} />
			    </div>
			    <div>
			    	
			    		<textarea placeholder="Type or Paset story here ,In a rough way the short story writer is to the novelist as a cabinetmaker is to a house carpenter– Annie Proulx" onChange={(event) => {this.setState({descr:event.target.value})}} />
			    </div>
			    <div>
			    	
			    		 <input type="file" style={{display:'none'}}  onChange={this.fileChangeHandler} ref={chooseFile => this.chooseFile = chooseFile} accept="image/"/>
			    </div>
			    <div>
			    <div>
			    <label>Choose a Cover image for your story</label>
			   </div>
			    		  <button id="imgbtn"  onClick={() => this.chooseFile.click()}>
			                                            +
			                                       </button>

			                                       {
			                                        this.state.selected ?
				                                        <img src={this.state.thumblink}  />
				                                        :
				                                        null
			                                    	}
			              
			       </div>
			       <div>

			    	<button  onClick={this.handleSubmit}>{this.state.isLoading ? 'Loading...' : 'Publish'}</button>
			    </div>
			   		</div>
			)
	}
}

export default AddStory;