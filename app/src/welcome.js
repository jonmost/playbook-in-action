var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var IndexLink = require('react-router').IndexLink;


var Welcome = React.createClass({
	getInitialState: function() {
		return {
			rfqs: "",
		};
	},
	componentDidMount: function() {
    getRFQs(function(content){ 
      this.setState({
        rfqs: content['data'],
      });
    }.bind(this));
   },
	render: function() {
		var rfqs = [];
		for (rfq in this.state.rfqs) {
			var this_rfq = this.state.rfqs[rfq];
			var agency = this_rfq['agency'];
			var doctype = this_rfq['doc_type'];
			var url = '#/rfp/' + this_rfq['id'] + '/question/1';
			rfqs.push(
				<li>
					<a href={url} >
						#{this_rfq['id']}, {this_rfq['doc_type']} for <b>{this_rfq['program_name']}</b> with {this_rfq['agency']}
					</a>
				</li>
			);
		}
		return (
			<div className="col-md-8">
				<div>Welcome to Playbook in Action! Before you begin, please consider the following:</div>
				<br />
				<div>
					<ul>
						<li>The intent of this tool is to assist in the creation of requirements documents
						for agile software development using best practices from the USDS
					  Playbook and TechFAR.</li>

						<li>The PM and the CO should use this tool jointly in partnership. Certain pages will only be applicable to only the CO or the PM.</li>

						<li>V1 is for firm fixed price contracts only. The firm fixed price will be per iteration. </li>
						<li>This tool is not built to support waterfall development requirements documents.</li>

						<li>All documents should be approved by a warranted contracting officer and in consultation with your legal council as required.</li>

						<h4>Also please note that this product is only in alpha, therefore any of the following may occur:</h4>
						<ul>
							<li>Content may unexpectedly change.</li>
							<li>Documents you have created may be deleted without warning.</li>
							<li>Certain pages may not always be functioning. We recommend you refresh the page if this happens.</li>
						</ul>
					</ul>
				</div>
				{(rfqs.length > 0)? <div><div className="sub-heading">Resume RFQ</div>
					<ul>
						{rfqs}
					</ul></div> : null}
			
				<br />
				<IndexLink to="/rfp">
					<Button bsStyle="primary">
						Start	New RFQ	
					</Button>
				</IndexLink>
			</div>
		);
	},
});

module.exports = Welcome;
