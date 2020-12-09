import { Link } from "react-router-dom";
import React from "react";
import "./FormAuthentication.scss";
const firebase = require("firebase");

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: "",
    };
  }

  render() {
    return (
      <div className="container">
        <Link to="/login">
          <img
            className="logo-text"
            src="https://svgshare.com/i/S7V.svg"
            alt=""
          />
        </Link>
        {/* <h1 className="h1-form">Log in</h1> */}
        <button
          type="submit"
          className="btn btn--demo"
          onClick={this.createAndLoginDemoUser}
        >
          Log in as a demo user
        </button>
        <h4 className="h4-form">
          No email or password is required to log in as a demo user
        </h4>
        {/* <h2 className="h2-form">Or log in with email</h2> */}
        <span class="separator-row">
          <span class="separator-row__horizontal-line"></span>
          <span class="separator-row__label">or</span>
          <span class="separator-row__horizontal-line"></span>
        </span>
        <form onSubmit={(e) => this.submitLogin(e)}>
          <input
            // autoFocus
            type="text"
            placeholder="Email"
            className="input input--email"
            onChange={(e) => this.userTyping("email", e)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input--password-confirmation"
            onChange={(e) => this.userTyping("password", e)}
          />
          <h4 className="error-text">
            {this.state.loginError ? this.state.loginError : null}
          </h4>
          <button type="submit" className="btn btn--log-in">
            Log in
          </button>
        </form>
        <h5 className="h5-form">
          Don't have an account?{" "}
          <Link to="/signup" className="h5-form__link">
            Sign up
          </Link>
        </h5>
      </div>
    );
  }
  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  createAndLoginDemoUser = async () => {
    const demoUser = this.generateRandomString(10);
    const demoEmail = `${demoUser}@gmail.com`;
    const demoPassword = "thisisademo";
    const demoNickname = "Demo";
    await this.setState({
      email: demoEmail,
      password: demoPassword,
      nickname: demoNickname,
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email.toLowerCase(),
        this.state.password
      )
      .then(
        (authRes) => {
          console.log("authRes = ", authRes);
          const userObj = {
            email: authRes.user.email,
            nickname: this.state.nickname,
          };

          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(userObj)
            .then(
              async () => {
                const defaultNotes = this.createDefaultNotes();

                await firebase
                  .firestore()
                  .collection("notes")
                  .doc(this.state.email)
                  .set({
                    savedNotes: [...defaultNotes],
                  });
                // this routes us to the dashboard once we've successfully signed up
                this.props.history.push("/dashboard");
              },
              (dbError) => {
                console.log(dbError);
                this.setState({ loginError: "Failed to add user" });
              }
            );
        },
        (authError) => {
          console.log(authError);
          this.setState({ loginError: authError.message });
        }
      );
  };

  submitLogin = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.email.toLowerCase(),
        this.state.password
      )
      .then(
        () => {
          this.props.history.push("/dashboard");
        },
        (err) => {
          this.setState({ loginError: err.message });
          console.log(err);
        }
      );
  };

  createDefaultNotes = () => {
    return [
      {
        title:
          "Welcome to Note-It, a full-stack application built using React, Firebase and React Quill 😁",
        body: `<h2>Thanks for stopping by!</h2><p><br></p><p>I'm Cam Green, the creator of Note-It, a full-stack application built with React, Firebase and React Quill. ✍️</p><p><br></p><p>Feel free to take a look at some demo notes I've included with your account to get started, and add some more notes if you'd like!</p><p><br></p><p>The link to the project repo can be found <a href="https://github.com/camcgreen/noteit" rel="noopener noreferrer" target="_blank">here</a>.</p><p><br></p><p>For any opportunities, please do feel free to contact me on <a href="mailto:c.c.green@outlook.com" rel="noopener noreferrer" target="_blank">c.c.green@outlook.com</a>. 🤓</p>`,
        id: this.generateRandomString(10),
        timestamp: Date.now(),
        backgroundColor: "#ffdbcd",
      },
      {
        title: "CSS Pseudo Selectors: What are they?",
        body: `<p><em>Written by: Prashanth Wagle</em></p><p><em>Link: </em><a href="https://medium.com/front-end-weekly/css-pseudo-selectors-what-are-they-ebfe354292b6" rel="noopener noreferrer" target="_blank">https://medium.com/front-end-weekly/css-pseudo-selectors-what-are-they-ebfe354292b6</a></p><h2><br></h2><h2>Basics</h2><p><br></p><p>Selectors are patterns used to identify select the elements in the DOM for which styles would be applied. In fact, they are the first part of any CSS rule.</p><p><br></p><p>Example:</p><p><br></p><pre class="ql-syntax" spellcheck="false">h1 {    background-color: magenta;  }</pre><p><br></p><p><em>h1 is the selector in the above example.</em></p><p><br></p><p>Out of various patterns used to select a particular DOM element from the tree, pseudo-elements and pseudo-classes&nbsp;<em>(obviously!)</em>&nbsp;are one of its kind which is drastically different than the common ones. (FYI: Type, class, and ID selectors, Attribute selectors, Attribute selectors are the other types).</p><p><br></p><h2>Psuedo-Classes</h2><p><br></p><p>Pseudo-classes are identified with a single colon according to the CSS3 specification. A pseudo-class is a selector that selects elements that are in a specific state. For instance, the specific state may be an HTML element that is clicked/hovered or an element that is the first child of its parent.</p><p><br></p><p>The syntax of pseudo-classes is:</p><p><br></p><pre class="ql-syntax" spellcheck="false">element:name {   // properties}</pre><p><br></p><p>Example:</p><p><br></p><pre class="ql-syntax" spellcheck="false">li:first-child {  color: red;}</pre><p><br></p><p>Here the first-child selector selects the li element which is the first child among its siblings. This selector would be helpful in styling without having to add/delete classes via Javascript if more sibling elements are added.</p><ol><li><strong>Pseudo-classes which are user-action based</strong></li><li>The styling will be based on the action carried out by the users.</li><li>Eg:&nbsp;:hover&nbsp;- applies when the user hovers over the element,&nbsp;:focus&nbsp;- applies when the user selects the input element.</li><li><strong>Pseudo-Classes which are based on the position</strong></li><li>The styling will be based on the position of the element in the DOM tree relative to its sibling/parents.</li><li>Eg:&nbsp;:first-child&nbsp;– selects the first element within a parent.&nbsp;:nth-child()&nbsp;– selects elements based on a simple provided algebraic expression. A few instances are&nbsp;:nth-child(2n)&nbsp;wherein all even children are selected and&nbsp;:nth-child(2n+1)&nbsp;wherein all odd children are selected.</li><li><strong>Other Pseudo-Classes</strong></li><li>:not()&nbsp;– removes elements from an existing matched set that match the selector inside the parameter of :not().</li><li>:empty&nbsp;- selects the pseudo-classes which have no text or child elements.</li></ol><p><br></p><h2>Pseudo-Elements</h2><p><br></p><p>Pseudo-Elements are used to style specific parts of the element or elements. According to the CSS3 specification they are identified with double-colon (::). For example, they may be used to change the properties of the first letter or a line of an element.</p><p><br></p><p>The syntax of pseudo-elements is:</p><pre class="ql-syntax" spellcheck="false">element::name{   //properties}</pre><p><br></p><p>Example:</p><pre class="ql-syntax" spellcheck="false">p::first-line {  color: #5e5e5e;}</pre><h1><br></h1><h2>Examples of Psuedo-Elements</h2><p><br></p><p>The commonly used pseudo-elements include:</p><p>::first-line&nbsp;to style the first line of the element.</p><p>::first-letter&nbsp;to style the first letter of the element.</p><p>::before&nbsp;to insert some content before the element.</p><p>::after&nbsp;to insert some content after the element.</p><p>::selection&nbsp;to style the content selected by the user.</p><p>Other rarely used pseudo-elements:</p><p>::file-selector-button,&nbsp;::backdrop,&nbsp;::cue,&nbsp;::cue-region,&nbsp;::grammar-error,&nbsp;::part(),&nbsp;::placeholder</p><p><br></p><h2>Note</h2><p><br></p><p>The single-colon syntax was used for both pseudo-classes and pseudo-elements in CSS2 and CSS1.</p><p><br></p><p>The double-colon replaced the single-colon notation for pseudo-elements in CSS3. This was an attempt from W3C to distinguish between pseudo-classes and pseudo-elements.</p><p>For backward compatibility, the single-colon syntax is acceptable for CSS2 and CSS1 pseudo-elements.</p>`,
        id: this.generateRandomString(10),
        timestamp: Date.now(),
        backgroundColor: "#ffe4ed",
      },
      {
        title:
          "How UX skills help me as a professional Front End Web Developer",
        body: `<p><em>Written by: Adi Achituve</em></p><p><em>Link: </em><a href="https://medium.com/front-end-weekly/how-ux-skills-help-me-as-a-professional-front-end-developer-4d46845e9c33" rel="noopener noreferrer" target="_blank">https://medium.com/front-end-weekly/how-ux-skills-help-me-as-a-professional-front-end-developer-4d46845e9c33</a></p><p><br></p><h2>Background</h2><p><br></p><p>As a senior web front end developer (FED), I love to code and implement complex UI systems, I enjoy playing with JavaScript, and also I have a deep passion for User Experience (UX) design.</p><p>Understanding UX principles is often not required from a front end developer. Occasionally you may notice it on the job description under the “advantages’’ section. However, for most positions, it’s not mandatory. On the other hand, UX designers are required to have some coding and technical skills. They are expected to know enough to communicate with developers and understand technical limitations. In my opinion, it isn’t enough that only one side tries to bridge the gaps.</p><p>I strongly believe that knowing basic UX design can give FEDs important skills that will improve any project they are working on. As a result, it will directly influence the target audience and will help users retention.</p><p><br></p><p>After I took a full-time course in UX, participated in UX conferences, and read about the subject for many hours, I bring here some examples of how those skills benefit me in my day to day job and turn me into a better front end developer.</p><p><br></p><h2>Screen design principles</h2><p><br></p><p>The screen layout is the most important thing you need to understand in order to make better planning of your app.</p><p><br></p><p><strong>Side menu</strong>&nbsp;that slides from the left or right is a good design in complex systems when there is not enough space for all horizontal tabs at the top menu. It is easier to scan with the eyes from top to bottom instead of left to right, and also easier to scan hierarchy levels in vertical.</p><p><br></p><p><strong>Grid</strong>&nbsp;is a structure that helps to place elements in the screen. It lowers the cognitive overload and helps users to complete goals in the app. Instead of giving a fixed size to the elements, grid allows to set a position, width and height according to its columns and rows. Usually a<a href="https://www.interaction-design.org/literature/article/the-grid-system-building-a-solid-design-layout" rel="noopener noreferrer" target="_blank">&nbsp;grid system</a>&nbsp;is defined by 12 columns (or 16 in some cases) because it makes it easy to divide them for responsive design. The gap between columns is called&nbsp;<em>gutter</em>&nbsp;and it allows the distribution of the elements in a uniform manner.&nbsp;<a href="https://css-tricks.com/snippets/css/complete-guide-grid" rel="noopener noreferrer" target="_blank">CSS Grid</a>&nbsp;with 12 columns is recommendable when you plan a complex screen. The gutter is set with the&nbsp;grid-gap&nbsp;property.</p><p><br></p><p><strong>Tables</strong>&nbsp;are always a risk, there are mistakes to avoid that you should be familiar with.</p><ul><li>Avoid horizontal scroll! it requires a click and drag on the scrollbar and research shows that users are too lazy to do that (unlike a vertical scroll that allows to use the mouse wheel). Instead of horizontal scroll it’s more common to convey the information with a popup, a side menu or an expandable row. If you must have a horizontal scroll, implement&nbsp;onScroll&nbsp;event that allows the user to use the mouse wheel.</li><li>Add the properties&nbsp;position:sticky; top: 0;&nbsp;to fix the header when scrolling in long tables.</li><li>Use ellipsis sentences and allow the user to resize the columns.</li></ul><p><br></p><p><strong>The&nbsp;</strong><a href="https://uxplanet.org/golden-ratio-bring-balance-in-ui-design-765c954f0ff9" rel="noopener noreferrer" target="_blank"><strong>Golden Ratio</strong></a>&nbsp;is a key principle in UX design. It is customary to follow it when partitioning the screen or placing elements because it brings harmony. For example, when you get a screen that is partitioned according to a ratio of 1/3 and 2/3 you shouldn’t use fixed pixels, but rather&nbsp;<a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" rel="noopener noreferrer" target="_blank">CSS Flexbox</a>&nbsp;with properties&nbsp;flex:1&nbsp;and&nbsp;flex:2.</p><p><br></p><h2>Optimistic UI</h2><p><br></p><p>Optimistic UI is a super famous technique, also known as<a href="https://en.wikipedia.org/wiki/Client-side_prediction" rel="noopener noreferrer" target="_blank">&nbsp;client-side prediction</a>. The key principle is that most of the time when users perform some action that needs to be persistent in a remote server it will succeed. So you shouldn’t wait for a response to show the result. If the call will fail, show that something went wrong.</p><p><br></p><p>In this way your product will feel really fast which will make users happy and increase retention. According to the<a href="https://web.dev/rail" rel="noopener noreferrer" target="_blank">&nbsp;Rail model</a>, you should show response within 100 ms, so users will feel like the interactions are instantaneous.</p><p><br></p><p>The most famous example is the&nbsp;<em>like</em>&nbsp;button in Facebook, it will show your&nbsp;<em>like</em>&nbsp;even when there is no connection to the server. On Instagram your photos are uploaded much more early than it looks. The second you choose a photo they start to upload without waiting for the publish click.</p><p>The implementation is easy, usually these are the steps:</p><p><br></p><p><img src="https://miro.medium.com/max/1240/1*rCSGr-q2S9NBeD23qZocoA.png"></p><p><br></p><p>In an Optimistic UI, move the render new UI before the request is called:</p><p><br></p><p><img src="https://miro.medium.com/max/1240/1*L-Cc5fxn_X-1DSCveBG0FQ.png"></p><p><br></p><h2>The fold line</h2><p><br></p><p>The&nbsp;<em>fold line</em>&nbsp;is the line at which the scroll is starting.&nbsp;<em>Above the fold</em>&nbsp;is a term used to describe anything that is visible immediately without any scrolling. When scrolling the user consumes less content because the page is in motion. Also, studies have shown that 80% of the time users are above the fold and 20% of the time below it, regardless of how long the page is.</p><p><br></p><p>That is why you, as a FED, should pay attention that important elements, like CTA (Call To Actions) buttons, will stay above the fold.</p><p>To encourage scrolling, the fold line should cut elements, like an image (But not the important ones!). This is something to be aware of especially when you are planning responsive layouts.</p><p><br></p><p><img src="https://miro.medium.com/max/1198/1*I-a4nHtz4hVmzkb4dJgUiA.png"></p><p><br></p><h2>localStorage and sessionStorage</h2><p><br></p><p>As a front end developer you should be familiar with&nbsp;localStorage<em>&nbsp;</em>and&nbsp;sessionStorage, the most common technique to store data in the browser in key/value pairs. But, how can they help improve UX? you can store the custom data and the user steps to prevent the user from starting all over again. Utilise it efficiently, and your users will come back!</p><p><br></p><p>Consider a dashboard layout that the user customised according to his preferences, you can save the dashboard in the&nbsp;localStorage&nbsp;for the next visit, and the dashboard will appear immediately! (it’s related to the Optimistic UI topic in the previous section) it’s important to mention that this is not a substitute to remote DB.</p><p><br></p><p>Fast navigation is a basic UX principle which states that the user should get to anywhere from anywhere by up to 3 clicks. There are many models to achieve this, one example is&nbsp;<em>Breadcrumbs</em>.&nbsp;<a href="https://www.smashingmagazine.com/2009/03/breadcrumbs-in-web-design-examples-and-best-practices/" rel="noopener noreferrer" target="_blank">Breadcrumbs</a>&nbsp;is a navigation model that can be implemented easily with&nbsp;sessionStorage&nbsp;by saving each page the user visited. You can also save data from the user’s journey, for example search terms the user had used to navigate to some result.</p><p><br></p><h2>Interaction is not graphic design</h2><p><br></p><p>UX designer is still considered as a new profession. Most UX designers came from graphic and print design. Some companies still haven’t progressed to understand that UI designer and UX designer have different responsibilities and often one person is doing both.</p><p>Digital design is much different from graphic design and it’s not enough to get wireframes that look good, but miss the interaction with the user. The pages today are more than just written content, they are very dynamic.</p><p><br></p><p><em>Indications&nbsp;</em>are one of the most basic UX principles —&nbsp;<strong>to give feedback</strong>.</p><p><br></p><p>The user needs to know that something happened or is going to happen. You need to guide the user to perform some action. If you get wireframes without<a href="https://xd.adobe.com/ideas/process/ui-design/designing-interactive-buttons-states" rel="noopener noreferrer" target="_blank">&nbsp;dynamic states</a>&nbsp;like pointer states (hover,&nbsp;active&nbsp;and&nbsp;disabled) you should request for it.</p><p><br></p><p>Besides pointer states, you can give much more feedback like the loading state in asynchronous action, the progress bar in uploading situations, drop areas, input focus, etc.</p><p><br></p><p><img src="https://miro.medium.com/max/1200/1*jau_OzkGdz2WKLU-aiu0RQ.gif"></p><p><br></p><p>Surprise images are revealed in hover interaction to attract users and reinforce them to scan products in <a href="snowehome.com" rel="noopener noreferrer" target="_blank">snowehome.com</a>.</p><h2><br></h2><h2>On a final note</h2><p><br></p><p>You don’t need to spend all your time to learn UX, there is endless information and ever-changing trends to learn. It’s enough to read about the basic concepts (like the ones I brought here) to get some intuition about why your wireframes look the way they are. It will be beneficial for you to bring this knowledge when you talk, ask or suggest with your designer.</p><p><br></p><p>Just remember the number one rule in UX design —&nbsp;<strong>the user is the most important, and you are not the user.</strong></p>`,
        id: this.generateRandomString(10),
        timestamp: Date.now(),
        backgroundColor: "#fff5e8",
      },
      {
        title: "Props Drilling In React.Js",
        body: `<p><em>Written by: Hadeel Salah</em></p><p><em>Link: </em><a href="https://medium.com/front-end-weekly/props-drilling-in-react-js-723be80a08e5" rel="noopener noreferrer" target="_blank">https://medium.com/front-end-weekly/props-drilling-in-react-js-723be80a08e5</a></p><p><br></p><h2>Introduction</h2><p><br></p><p>First of all, let us just be thankful for Leonardo DiCaprio. Are you curious why?&nbsp;</p><p><br></p><p>This article will cover two topics:</p><ul><li>What props drilling is</li><li>How to sidestep props drilling</li></ul><p><br></p><p><em>Let’s start the party!</em></p><p><br></p><p><img src="https://miro.medium.com/max/60/0*K-S-clRLjmtcdy_I?q=20"></p><p><br></p><h2>What is Props Drilling?</h2><p><br></p><p>Let’s recap what we know first about the&nbsp;<strong>Props</strong>&nbsp;concept.&nbsp;<strong>Props&nbsp;</strong>are the data we pass -or can access- from the top-level components to any number of child components on our website.&nbsp;<strong><em>Look at diagram -1</em></strong></p><p><br></p><p><img src="https://miro.medium.com/max/60/0*b58JvbNhE1tKv7Tb?q=20"></p><p><img src="https://miro.medium.com/max/1270/0*b58JvbNhE1tKv7Tb"></p><p><br></p><p><em>Diagram-1</em></p><p><br></p><p>Props Drilling (also know as threading) is when <em>diagram -1 </em>transform to be like this.</p><p><img src="https://miro.medium.com/max/60/0*ioNTCLVXxOEyed9U?q=20"></p><p><img src="https://miro.medium.com/max/1256/0*ioNTCLVXxOEyed9U"></p><p><br></p><p><em>Diagram-2</em></p><p><br></p><p>From <em>diagram-2</em>, the Props Drilling (Threading) is a concept that refers to the process you pass the data from the parent component to the&nbsp;<strong><em>exact&nbsp;</em></strong>child Component&nbsp;<strong>BUT</strong>&nbsp;in between, other components owning<strong><em>&nbsp;the props just to pass it down the chain.</em></strong></p><p><br></p><p>So, what is the link between&nbsp;<strong>Props Drilling</strong>&nbsp;and&nbsp;<strong>Leo</strong>?</p><p><br></p><p>Well, Leo has been nominated 7 times for the Oscars, and once he won one time in his movie “<a href="https://www.netflix.com/title/80064516" rel="noopener noreferrer" target="_blank"><strong>Revenant</strong></a>”.However, in the React.js world, his name is the props you passed to&nbsp;<em>more than one level even they don’t need it until it reaches the one&nbsp;</em><strong><em>that you use props in.</em></strong></p><p><br></p><p><strong><em>You can see the code by this</em></strong><a href="https://codesandbox.io/s/propsdriling-qhm6i?file=/src/App.js" rel="noopener noreferrer" target="_blank"><strong><em>&nbsp;link</em></strong></a><strong><em>.</em></strong></p><p><br></p><h2>2. How To Sidestep Props Drilling.</h2><p><br></p><p>There are several solutions to avoid props drilling :</p><p><em>1. React Context API.</em></p><p><em>2. Composition</em></p><p><em>3. Render props</em></p><p><em>4. HOC</em></p><p><em>5. Redux or MobX</em></p><p><br></p><h2>Avoid Props By Drilling Using React Context API</h2><p><br></p><p>First, you need to initialise the context. You can do that in the js file or in the top of the parent component.</p><p><strong>const</strong>&nbsp;MyContext = React.createContext() ;</p><p>After that, move on to create your provider and use the context in it. Then, we need to use the context and warp the component with it which injects the context argument in it.</p><p><br></p><pre class="ql-syntax" spellcheck="false">export default class App extends React.Component {  state = {    actor : 'Leonardo DiCaprio',  }  render(){    const {actor} = this.state;   return (    &lt;&gt;      &lt;Header /&gt;         &lt;MyContext.Provider value={{actor}}&gt;           &lt;div className="App"&gt;              &lt;h1&gt;Props Driling&lt;/h1&gt;              &lt;ListMovies  /&gt;            &lt;/div&gt;        &lt;/MyContext.Provider&gt;      &lt;Footer /&gt;    &lt;/&gt;  );}}</pre><p><br></p><p>Afterward, it is pretty straight forward. You can use the context in the same way you used props.</p><p><br></p><pre class="ql-syntax" spellcheck="false">import React from "react";import "./styles.css";export const MyContext = React.createContext({});const Revenant =() =&gt;{  return(    &lt;MyContext.Consumer&gt;        {context =&gt; (            &lt;&gt;             &lt;div id="sixth"&gt;              &lt;h1&gt;                 The winner is {context.actor} in Revenant              &lt;/h1&gt;                &lt;/div&gt;                          &lt;/&gt;        )}    &lt;/MyContext.Consumer&gt;  );}function OnceUponATimeInHollywood (){  return(        &lt;div id="fifth"&gt;          &lt;p&gt;           nominated in Once Upon A Time In Hollywood          &lt;/p&gt;         &lt;/div&gt;                     );}function TheWolfOfWallStreet(){  return(        &lt;div id="fourth"&gt;          &lt;p&gt;           nominated Time in The Wolf Of Wall Street          &lt;/p&gt;         &lt;/div&gt;                     );}function BloodDiamond (){  return(        &lt;div id="third"&gt;          &lt;p&gt;           nominated in BloodDiamond          &lt;/p&gt;         &lt;/div&gt;                     );}function Aviator (){  return(        &lt;div id="second"&gt;          &lt;p&gt;           nominated in Aviator          &lt;/p&gt;         &lt;/div&gt;                     );}function WhatsEatingGilbertGrape (){  return(        &lt;div id="first"&gt;          &lt;p&gt;           nominated in Whats Eating Gilbert Grape movie          &lt;/p&gt;         &lt;/div&gt;                     );}function ListMovies(){  return (    &lt;div&gt;      &lt;h1&gt; The list of Leo movies&lt;/h1&gt;        &lt;WhatsEatingGilbertGrape /&gt;        &lt;Aviator /&gt;        &lt;BloodDiamond /&gt;        &lt;TheWolfOfWallStreet /&gt;        &lt;OnceUponATimeInHollywood /&gt;        &lt;Revenant/&gt;    &lt;/div&gt;  );  }</pre><p><br></p><p><strong>Note: You can see the code&nbsp;</strong><a href="https://codesandbox.io/s/avoid-props-drilling-using-context-api-8cbfi" rel="noopener noreferrer" target="_blank"><strong>here</strong></a></p><p><br></p><h2>2. Avoid Props Drilling By Composition</h2><p><br></p><p>Simply, to compose the react component, you have to divide the component to containers and presenters stateful and stateless. Then pass the data as props to children.</p><p><br></p><p>So, the main component will be like this:</p><p><br></p><pre class="ql-syntax" spellcheck="false">export default class App extends React.Component {  state = {    actor : 'Leonardo DiCaprio',   }  render(){    return (      &lt;&gt;        &lt;Header /&gt;          &lt;div className="App"&gt;            &lt;ListMovies  passData={this.state}/&gt;          &lt;/div&gt;          &lt;Footer /&gt;        &lt;/&gt;    );  }  }</pre><p><br></p><p>The list movies component will contain all the components like this:</p><p><br></p><pre class="ql-syntax" spellcheck="false">function ListMovies({passData}){    return(      &lt;div&gt;        &lt;WhatsEatingGilbertGrape /&gt;        &lt;Aviator /&gt;        &lt;BloodDiamond /&gt;        &lt;TheWolfOfWallStreet /&gt;        &lt;OnceUponATimeInHollywood /&gt;        &lt;Revenant passData={passData} /&gt;      &lt;/div&gt;    )    }</pre><p><br></p><p>Here, pass the props to the Revenant component.</p><p><br></p><pre class="ql-syntax" spellcheck="false">const Revenant = props =&gt;{  return(    &lt;div id="sixth"&gt;      &lt;h1&gt;        The winner is {props.passData.actor} in Revenant      &lt;/h1&gt;    &lt;/div&gt;);}</pre><p><br></p><p>You can see the full code <a href="https://codesandbox.io/s/solve-props-drilling-without-anything-w1xcn?file=/src/App.js:1089-1504" rel="noopener noreferrer" target="_blank"><strong>here</strong></a>.</p><p><br></p><p><strong><em>Bravo, You finished successfully</em></strong></p>`,
        id: this.generateRandomString(10),
        timestamp: Date.now(),
        backgroundColor: "#ccf4f5",
      },
      {
        title: "You may not need Redux",
        body: `<p><em>Written by: Sergey Stadnik</em></p><p><em>Link: </em><a href="https://medium.com/front-end-weekly/you-may-not-need-redux-c850233b0119" rel="noopener noreferrer" target="_blank">https://medium.com/front-end-weekly/you-may-not-need-redux-c850233b0119</a></p><p><br></p><h2>Introduction</h2><p><br></p><p>If you were starting a new React project a few years ago, that almost always meant that you’d include&nbsp;<a href="https://redux.js.org/" rel="noopener noreferrer" target="_blank">Redux</a>. React and Redux were thought to be one indivisible entity. When I was learning React myself I did that with the help of Stephen Grider’s excellent course&nbsp;<a href="https://www.udemy.com/course/react-redux/" rel="noopener noreferrer" target="_blank">Modern React with Redux</a>. That course is a true bestseller. Nearly 200,000 students watched it since it was released. Stephen keeps it updated so that it includes the latest React features. You got it — that bestselling course on React has “Redux” in its title.</p><p><br></p><p>The year is now 2020 as I am writing it from a social distancing safety of my home. Quite a lot has changed in React in those few years. We now have hooks, we mostly write functional components and we now have a new and improved&nbsp;<a href="https://reactjs.org/docs/context.html" rel="noopener noreferrer" target="_blank">context API</a>.</p><p><br></p><h2>Do we still need Redux?</h2><p><br></p><p>The big question is: Do we still need Redux?</p><p><br></p><p>I personally didn’t use Redux in any of project I started over the last couple of year or so. I don’t expect to use it in future either. Here’s why.</p><p><br></p><h2>Why I don't use Redux any more</h2><p><br></p><p>Redux was revolutionary when it appeared in 2015. It brought two big ideas to React:</p><ul><li>It combined action-based model of&nbsp;<a href="https://facebook.github.io/flux/" rel="noopener noreferrer" target="_blank">Flux</a>&nbsp;with a concept of&nbsp;<a href="https://redux.js.org/glossary#reducer" rel="noopener noreferrer" target="_blank">Reducer</a>&nbsp;(It is in its name:&nbsp;<em>“Red”</em>&nbsp;“ux” =&nbsp;<em>“Red”ucer + Fl”ux”</em>). That&nbsp;<em>Action — Reducer</em>&nbsp;pattern instantly gained traction among React programmers.</li><li>It solved an&nbsp;<em>application-wide state</em>. Let’s say we had certain data that we wanted to make available throughout the app. Before Redux the only reliable way to do that was to pass that data through props to child components&amp;mldr; and then to their child components, and so on. Redux changed that. It allowed pieces of data to transcend the entire component hierarchy of an application without passing that data through props from one component to another. It also provided a convenient way to access and manipulate that application state from anywhere in the application.</li></ul><p><br></p><h2>React Context API</h2><p><br></p><p>Redux used a&nbsp;<a href="https://reactjs.org/docs/legacy-context.html" rel="noopener noreferrer" target="_blank">context API</a>&nbsp;under the hood, which at the time was intended for React internal use only and was cumbersome to use.</p><p>Fast forward to 2020. A lot has changed. We now have hooks and the stable public&nbsp;<a href="https://reactjs.org/docs/context.html" rel="noopener noreferrer" target="_blank">context API</a>&nbsp;which is ready for the prime time. An action — reducer pattern is now readily available via&nbsp;<a href="https://reactjs.org/docs/hooks-reference.html#usereducer" rel="noopener noreferrer" target="_blank">useReducer hook</a>. We don’t need Redux for that any more.</p><p><br></p><p>The modern React&nbsp;<a href="https://reactjs.org/docs/context.html" rel="noopener noreferrer" target="_blank">context API</a>&nbsp;is simpler, more efficient than before and comes with&nbsp;<a href="https://reactjs.org/docs/hooks-reference.html#usecontext" rel="noopener noreferrer" target="_blank">hooks support</a>. In most cases,&nbsp;<a href="https://kentcdodds.com/blog/application-state-management-with-react" rel="noopener noreferrer" target="_blank">wrapping your application state in a context</a>&nbsp;is all you need to access it anywhere in your app.</p><p><br></p><h2>So what does this mean for Redux?</h2><p><br></p><p>My point of view that in a vast majority of cases you don’t need Redux any more. Contexts and hooks get the job done most of the time. If you still think that contexts are not very friendly you may have a look at&nbsp;<a href="https://github.com/jamiebuilds/unstated-next" rel="noopener noreferrer" target="_blank">unstated-next</a>&nbsp;library which is just a thin wrapper on top of the context API. That whole library is just 200 bytes!</p><p><br></p><h2>Wrap up</h2><p><br></p><p>Redux is a complicated beast. It will bring a lot of complexity into your app. Some of that complexity is&nbsp;<a href="https://redux.js.org/api/bindactioncreators" rel="noopener noreferrer" target="_blank">obvious</a>&nbsp;while many other non-obvious gotchas are&nbsp;<a href="https://dev.to/jsmanifest/12-things-not-to-do-when-building-react-apps-with-redux-n5i" rel="noopener noreferrer" target="_blank">hidden and waiting for you to trip on it</a>. Think twice if you want to deal with that. Even then it is worth checking out alternatives such as&nbsp;<a href="https://mobx.js.org/" rel="noopener noreferrer" target="_blank">MobX</a>&nbsp;or&nbsp;<a href="https://github.com/atlassian/react-sweet-state" rel="noopener noreferrer" target="_blank">react-sweet-state</a>.</p>`,
        id: this.generateRandomString(10),
        timestamp: Date.now(),
        backgroundColor: "#e5f9ea",
      },
      {
        title: "A Quick Guide to JavaScript Functions",
        body: `<p><em>Written by: Deepak Gangwar</em></p><p><em>Link: </em><a href="https://medium.com/front-end-weekly/quick-guide-to-javascript-functions-7ceb09977bd6" rel="noopener noreferrer" target="_blank">https://medium.com/front-end-weekly/quick-guide-to-javascript-functions-7ceb09977bd6</a></p><h2><br></h2><h2>Introduction</h2><p><br></p><p>Functions are the life of JavaScript and at first can be overwhelming. But as you get to know them, they are going to make your life a lot easier.</p><p><br></p><p>There are several ways to define a function in JavaScript here is your guide to them. I will try to keep it as simple as possible.</p><h2><br></h2><h2>Function declaration</h2><p><br></p><pre class="ql-syntax" spellcheck="false">function myName(parameter) {       console.log(parameter);}myName();</pre><p><br></p><p>It is the most common methods of declaring a function using function keyword and then giving it a name followed by parenthesis. You can pass arguments in these parenthesis. Multiple arguments can be given, separated by commas.</p><p><br></p><p>Then you can call a function by its name in order to run it.</p><p><br></p><h2>Function expression</h2><p><br></p><pre class="ql-syntax" spellcheck="false">const myName = function(parameter) {       console.log(parameter);}myName();</pre><p><br></p><p>Here we remove the function keyword from the beginning and declare it as a variable. We the assign it a value equal to function. It can also take arguments and when the function gets called, it runs the code within the block.</p><p><br></p><p><br></p><h2>Arrow functions</h2><p><br></p><pre class="ql-syntax" spellcheck="false">const example = () =&gt; {       //...}example();</pre><p><br></p><p>This might be the reason why you came here. Arrow functions are great when it comes to simplifying our code and can help you write much cleaner shorter code. Let us take an example and compare arrow function with normal function.</p><p><br></p><pre class="ql-syntax" spellcheck="false">//As function declarationfunction addNum(num1, num2) {       return num1 + num2;}addNum(5,2);</pre><p><br></p><p>Now doing it with arrow function</p><p><br></p><pre class="ql-syntax" spellcheck="false">//Declaring it with arrow function//Method1const addNumb = (num1, num2) =&gt; num1 + num2;addNumb(5,2);//Method2const addNumb = (num1, num2) =&gt; {      return num1 + num2;}addNumb(5,2);//Both perform the same job but we can write three lines of code in just one line by using arrow functions.</pre><p><br></p><p>To write arrow function remove the function keyword and instead declare it as const. Add an = sign between name and the parameters and the parameters are followed by the fat arrow =&gt; and then the block of expression.</p><p><br></p><p>We can omit the curly braces if you need to return only one line of code. Along with this the return keyword is also removed.</p><p>If you have only one argument, then the parenthesis can also be removed.</p><p><br></p><pre class="ql-syntax" spellcheck="false">const oneArgument = num1 =&gt; num1++ ;</pre><p><br></p><p>But in case of no argument, you have to keep the parenthesis.</p><p><br></p><pre class="ql-syntax" spellcheck="false">const noArgument = ()=&gt; console.log(2);</pre><h1><br></h1><h2>Function constructor</h2><p><br></p><pre class="ql-syntax" spellcheck="false">const example = new function("parameter", "console.log(parameter)");example();</pre><p><br></p><p>This is yet another way of declaring a function.</p><p><br></p><h2>The Takeaway</h2><p><br></p><p>There is no best way to do it and it often depends on the job you want to do. One thing to remember is that some frameworks like Vue do not use arrow functions so make sure to check out the manual before using them in your project.</p>`,
        id: this.generateRandomString(10),
        timestamp: Date.now(),
        backgroundColor: "#fffdc8",
      },
    ];
  };

  generateRandomString = (length) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  };
}

export default Login;
