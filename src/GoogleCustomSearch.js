import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

class GoogleCustomSearch extends React.Component {

// insert the script
componentDidMount() {

  (function() {
    var cx = '014332204796748306058:hf4ykxukjjk';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();

}

// insert the dom container
 render(){
   return (
       <div>
         <div className="gcse-searchbox" />
       </div>
   )
 }
}

GoogleCustomSearch.propTypes = {
  // correctAnswer: PropTypes.string.isRequired,
  // incorrectGoogleCustomSearch: PropTypes.array.isRequired,
  // handleAnswerSubmission: PropTypes.func.isRequired
}

export default GoogleCustomSearch;
