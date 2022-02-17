import React from 'react';
import styles from './App.module.scss';
import { marked } from 'marked';
import prismjs from 'prismjs';

function App() {
	marked.setOptions({
		// allow for carriage returns in markdown to be line breaks in html
		breaks: true,
		highlight: function (code) {
			return prismjs.highlight(
				code,
				prismjs.languages.javascript,
				'javascript'
			);
		},
	});

	const renderer = new marked.Renderer();
	renderer.link = function (href, title, text) {
		return `<a target="_blank" href="${href}">${text}</a>`;
	};

	const markdownPlaceholder = `# OMG a Heading! 
  ## Check out this subheading!
  **You can totally bold text like this!**
  _You can use italics like this_
  
  You can provide links to cool stuff or just shamelessly plug stuff!
  [definitely not my portfolio site...](https://jcodes.page)
  
  Time to try out lists! You can create an unordered list like this:
  - unordered item one 
  - unordered item two 
  - dynamite
  
  Numbered lists!
  1. omg 
  2. i kno
  3. legit
  
  What about nested lists??
  - we freaking got those 
    - oh yes we do
  
  Try doing some inline code like this:
  
  \`<div></div>\`
  
  You can also try a code block like this: 
  
  \`\`\`
  // omg a full code block!
  
  function whatTheFunction() {
    return 'lit'
  }
  \`\`\`
  
  Are there blockquotes you ask?
  
  > Yup - we have the blockquotes
  
  And you can absolute embed images - like this hibachi bed and breakfast sketch my friend Jarrett
  
  ![a sketch of a hibachi chef ominously making your bed](https://i.imgur.com/2M91tJo.jpg)
  `;

	const Header = ({ preview }) => {
		const headerStyles = {
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			fontFamily: preview
				? "'Readex Pro', sans-serif"
				: "'Roboto Mono', monospace",
			color: preview ? '#696969' : '#ccc',
			fontSize: '20px',
			fontWeight: 'bold',
			padding: '20px',
		};
		return (
			<header style={headerStyles}>
				{preview ? 'Markdown Preview' : 'Markdown Editor'}
			</header>
		);
	};

	const PreviewComponent = ({ markdown }) => {
		const markedConfig = marked.parse(markdown, { renderer: renderer });
		return (
			<div
				id={styles.preview}
				dangerouslySetInnerHTML={{ __html: markedConfig }}></div>
		);
	};

	class Markdown extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				markdown: markdownPlaceholder,
			};
			this.handleChange = this.handleChange.bind(this);
		}
		handleChange(e) {
			this.setState({
				markdown: e.target.value,
			});
		}
		render() {
			return (
				<div className={styles.container}>
					<div className={styles.markdown_container}>
						<Header />
						<textarea
							id={styles.editor}
							placeholder={markdownPlaceholder}
							value={this.state.markdown}
							onChange={(e) => this.handleChange(e)}
						/>
					</div>
					<div className={styles.preview_container}>
						<Header preview={true} />
						<PreviewComponent markdown={this.state.markdown} />
					</div>
				</div>
			);
		}
	}

	return (
		<div>
			<Markdown />
		</div>
	);
}

export default App;
