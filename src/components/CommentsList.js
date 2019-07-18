import React, { Component } from 'react';
import firebase from 'firebase';

class CommentsList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          comments: [],
          // selectedPlant: null
        }
      }

}

export default CommentsList;