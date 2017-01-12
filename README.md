>本文记录学习react的脚印

  React是一个用来构建用户界面的库

  **三大特征：**
  
    声明式
    基于组件
    一次学习，到处编写
  
  **一个简单的组件：**
  
    React的组件实现了一个render()函数，这个函数入参是数据，返回的是展现内容，
    下面的例子用的是一种类XML的语法（JSX）输入到render()函数的参数，可以通过
    this.props的方式访问。
    
    // 通过集成实现自定义组件
    class HelloMessage extends React.Component {
      {/*
        注意这是组件内部注释的写法。
        所有的组件都必须实现render()函数
      */}
      render() {
        return <div> Hello { this.props.name }</div>;
      }
    }
    {/* 下面这句话的意思是：将自定义的组件HelloMessage挂载到mountNode节点 */}
    ReactDOM.render(<HelloMessage name="wang" />,mountNode);
    
  **一个有状态的组件**
    
    除了可以通过this.props来访问外部传入的数据，一个组件还可以通过this.state维
    护内部状态数据。当一个组件的状态数据发生变化，已经渲染的标签将会通过调用
    render()被重新渲染。
    
    {/* 下面是一个记录时间的组件 */}
    class Timer extends React.Component {
      {/* 
        这是es6的语法，constructor是构造函数的意思，构造函数内部首先要执行
        super()来调用父类的构造函数 
        */}
      constructor(props) {
        super(props);
        {/* 构造函数内部初始化状态数据，这里的状态数据是一个对象 */}
        this.state = { secondsElspsed: 0 }
      }
      {/* 计数函数，记录走过的秒数 */}
      tick() {
        this.setState((prevState) => ({
          secondsElapsed: prevState.secondsElapsed + 1
        }));
      }
      {/* 生命周期函数，当组件挂载成功之后被调用 */}
      componentDidMount() {
        {/* 给本组件设置一个定时器，周期性的调用tick() */}
        this.interval = setInterval(() => this.tick(), 1000);
      }
      {/* 生命周期函数，当组件被卸载之前执行 */}
      componentWillUnmount() {
        {/* 清除组件内的定时器，防止内存泄漏 */}
        clearInterval(this.interval)
      }

      {/* 渲染函数 */}
      render() {
        return (
          <div>Seconds Elapsed: { this.state.secondsElapsed } </div>
        );
      }
    }

    {/* 挂载组件 */}
    ReactDOM.render(<Timer />,mountNode);
    
    
   **一个应用程序**
   
    使用props和state可以构建一个小型的TUDO应用。这个例子使用state来
    记录当前的下拉列表项，保持和用户的输入一致。时间处理器闲的有些内
    联，但是它集成和实现了时间的代理。
    
    {/*  TODO应用 */}
    class TodoApp extends React.Component {
      construcotr(props) {
        super(props);
        {/*  为什么要绑定this */}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {  items: [], text: ''  }
      }
      
      render() {
        return (
          <div>
            <h3>TODO</h3>
            <TodoList  Items={ this.state.items } />
            <form onSubmit={ this.handleSubmit } >
              <input  onChange={ this.handleChange } 
                value={ this.state.text } />
             </form>
          </div>
        )
      }
      
      handleChange(e) {
        this.setState({ text:  e.target.value });
      }
      
      handleSubmit(e) {
        e.preventDefault();
        var newItem = {
          text: this.state.text,
          id: Date.now()
        };
        this.setState((prevState) => ({
          items: prevState.items.concat(newItem),
          text: ''
        }));
      }
    }
    
    {/*  下拉列表组件 */}
    class TodoList extends React.Component {
      render() {
        return (
          <ul>
            { this.props.items.map(item => (
              <li key={ item.id }>{ item.text }</li>
            )) }
          </ul>
        )
      }
    }
    
    ReactDOM.render(<TodoApp />, mountNode);
    
   **一个组件使用外部的插件**
    
    React非常灵活，提供了和外部的库或框架交互的钩子。下面这个例子使用
    了remarkable，一个外部的Markdown库，用来实时转换文本输入域中的
    内容。
    
    class MarkDownEditor extends React.Component {
      construcotr(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: 'Type some *markdown* here! ' }
      }
      
      handleChange() {
        this.setState({ value: this.refs.textarea.value });
      }
      
      getRowMarkup() {
        var md = new Remarkable();
        return { __html: md.render(this.state.value) };
      }
      
      render() {
        return (
          <div className="MarkdownEditor">
            <h3>Input</h3>
            <textarea
              onChange={ this.handleChange } ref="textarea"
              defaultValue={ this.state.value } />
            <h3>Output</h3>
            <div
              className="content"
               dangerouslySetInnerHTML={ this.getRawMarkup() }
          </div>
        )
      }
    }
    
    
>Hello World

    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('root')
    );
    
    可以在一个线上的环境执行这些代码
    http://codepen.io/gaearon/pen/ZpvBNJ/
  
  假设你熟悉JavaScript的语法；我们会使用一些ES6的语法，尽管用的比较少
  但是我们强烈建议你熟悉ES6中的箭头函数、classes、模板迭代、let、const
  你可以使用Babel REPL查看ES6编译后的结果。
    
>JSX

  **看下面的代码**
  
      const  element = <h1>Hello, world!</h1>
     它既不是JavaScript也不是html, 它就是JSX。它是对JS的扩展。我们推荐使用
     这种语言来描述React中的UI。它可能让你想起了模板，但是它却拥有所有
     js的功能。
     
  **嵌入表达式**
    
    你可以在jsx中嵌入js表达式，但是这些表达式需要使用花括号包括
    function formatName(user) {
      return user.firstName + '  '  +  user.lastName;   
    }
    
    const user = {
      firstName: 'Harper',
      lastName: 'Perez'
    };
    
    const element = {
      <h1>
        hello, { formatName(user) } !
      </h1>
    }
    
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
    
    这里我们将jsx的代码写成了很多行，仅仅是为了可读性。尽管这不是必须的，但是
    我们还是建议将多行的jsx代码使用小括号括起来，防止自动的分号造成的陷阱。
    
  **JSX可作为表达式**
  
    编译之后jsx表达式就变成了常规的JavaScript对象。这意味着你可以将jsx用在if、for
    等的花括号中间，或者是作为一个参数传入某个方法，或者是作为某个方法的返回值。
    
    function getGreeting(user) {
      if(user) {
        return <h1>Hello, { formatName(user) }</h1>
      }
      
      return <h1>Hello, Stranger.</h1>
    }
    
  **JSX的属性**
    
    使用引号指定字符串属性
    const element = <div tableIndex="0"></div>
    
    使用花括号插值
    const element = <img src={ user.avatarUrl } ></img>
    
    如果一个jsx没有子节点，则可以使用/>结束
    const element = <img src={ user.avatarUrl } />
    
    jsx的标签可以包含子节点
    const element = (
      <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
      </div>
    );
    
  **警告**
    
    由于JSX更接近JavaScript语法，而不是HTML语法，所以React使用驼峰命名规则，
    而不是HTML的属性命名
    如：class  在jsx中写成className, tabindex写成tabIndex
    
  **JSX防止注入攻击**
    
    默认，React DOM在渲染之前防止任何嵌入的jsx,这样就确保了你不能再你的应用
    程序中注入不明确的值。所有的值在渲染之前将会被转换成字符串。这有助于阻止
    XSS攻击。
    
    
  **JSX Represents Objects** 
    
    Babel编译等同于React.createElement()调用
    下面的两种写法是相同的
    const element = (
      <h1 className="greeting">
        Hello, world!
      </h1>
    );
    
    const element = React.createElement(
      'h1',
      {className: 'greeting'},
      'Hello, world!'
    );
    
    React.createElement()执行一些检查帮助你写出高质量的代码，但是它造出来的对象
    是这样的
    // Note: 这样的结构看起来更简化
    const element = {
      type: 'h1',
      props: {
        className: 'greeting',
        children: 'Hello, world'
      }
    };
    这样的对象被称为“React元素”，你可以把他们作为你想要在屏幕上看到的东西。
    React读取这些对象并使用他们来构建DOM和保持DOM的最新状态。
    
    接下里我们探讨React元素的渲染
    
    
######################################################

>渲染元素

    对React来说元素是最小的应用构成的单位，一个元素描述了你希望在屏幕上
    看到的内容。
    const element = <h1>Hello, world</h1>;
    
    和DOM的元素不同的是React的元素是简单的对象，创建的成本非常低，
    React Dom 关心的是更新这个Dom，以匹配React元素的变化。
    
    有人可能会将元素和组件混淆，下一节我们详细讨论组件。元素正是组件的
    构成部分，我们鼓励你先阅读本节。
    
   **渲染一个元素到Dom中**
    
    假设你的html文件中有个div标签
    <div id="root"></div>
    我们称这个标签是根节点，因为这个节点中的所有内容将由React Dom来管理。
    
     仅仅由React构建的应用中通常只有一个独立的根节点。如果你将React集成到
     一个已经存在app中，你可以有任意个你想要的孤立节点。
     
     为了将你的元素渲染到DOM中，你需要给render()函数传递两个参数：
      元素本身
      挂载节点
      const element = <h1>Hello, world</h1>;
      ReactDOM.render(
        element,
        document.getElementById('root')
      );
     
   **更新已经渲染的元素**
     
     React的元素是不可改变的。一旦你创建了一个元素，你便不能修改他的子元素
     和属性。一个元素就想电影中的一个帧，它代表了某一个确切时点上的UI展现。
     
     到目前为止，更新这个元素唯一的办法是创建一个新的元素，并且将新元素传递
     给ReactDOM.render();
     参考前面的例子：
    function tick() {
      const element = (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
      );
      ReactDOM.render(
        element,
        document.getElementById('root')
      );
    }
    
    setInterval(tick, 1000);
    
    每次都是调用tick创建一个新的元素
    
    说明：在实际的生产中，我们通常只调用一次ReactDOM.render()函数，下一节
    我们将学习如何封装一个有状态的组件。
    
   **React制作必要的更新**
    
    React DOM会递归的对比这个元素和上一个版本的区别，只是更新希望更新的dom
    
######################################################

>Components and Props
   
    组件让我们将UI分割成独立的，可重用的，可以孤立构建逻辑的碎片。
   
    从概念上来说，组件就像是JavaScript中的function，它接受任意参数（这里叫做
    “Props"），然后返回一个元素（描述在浏览器中如何展现的物件）

   **Functional and Class Components**
    
    构建组件，最简单的方法是写一个JavaScript函数
     function Welcome(props) {
       return <h1>Hello, {props.name}</h1>;
     }
    这个function是一个标准的组件，因为它符合组件的定义。我们叫这种组件为Functional
    因为它太想JavaScript中的function。
    
    我们还可使用ES6中的class来定义一个组件
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    在React看来，上面两个方法构建组件是等价的。使用class构建组件将带来额外的一些特性
    下一节我们来讨论，到目前为止我们将使用Functional的简洁性来构建组件。
    
   **组件渲染**
   
    之前我们遇到让元素代表DOM标签
    const element = <div />;
    然而，元素还可代表用户自定义的组件
    const element = <Welcome name="Sara" />;
    
    当React遇到一个代表用户自定义组件的元素时，它将传递一个JSX属性给这个组件，此属性作为一个
    单例的对象，我们叫这个单例的对象为Props。
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    
    const element = <Welcome name="Sara" />;
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
    
    警告：所有的自定义组件必须使用大写字母开头，以区别原有的DOM标签。
    
   **Composing Components**
   
    组件可以引用另一个组件的输出。这使得我们可以在任何层级和细节上使用同一个组件。
    一个按钮、一个表单、一个对话框、一个屏幕。。。在React应用中的这些都是组件。
    
    如我们可以创建一个应用，多次渲染Welcome组件
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    
    function App() {
      return (
        <div>
          <Welcome name="Sara" />
          <Welcome name="Cahal" />
          <Welcome name="Edite" />
        </div>
      );
    }
    
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
   
    一个经典的React应用中只包含一个顶级的App组件。如果你在一个已有的应用中集成
    React,那么你可能从一个很小的button开始，主键的展开你的各个组件。
   
    警告：一个组件的返回必须是一个独立的root element
    
    
   **提取组件**
    
    不要害怕将一个大型的组件拆分成很多非常小的组件。
    function Comment(props) {
      return (
        <div className="Comment">
          <div className="UserInfo">
            <img className="Avatar"
              src={props.author.avatarUrl}
              alt={props.author.name}
            />
            <div className="UserInfo-name">
              {props.author.name}
            </div>
          </div>
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }
    
    这个组件中包含了了作者、文本、日期等内容，描述社交网站上的一个评论，因为
    它嵌套了很多内容，所以不容易修改，也不易重用，现在我们从从中提取住一些更
    小的组件
    #作者组件
    function Avatar(props) {
      return (
        <img className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />
      );
    }
    
    提取这个组件之后我们的代码变成如下的模样
    function Comment(props) {
      return (
        <div className="Comment">
          <div className="UserInfo">
            <Avatar user={props.author} />
            <div className="UserInfo-name">
              {props.author.name}
            </div>
          </div>
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }
    
    下面我们在提取一个UserInfo 组件
    function UserInfo(props) {
      return (
        <div className="UserInfo">
          <Avatar user={props.user} />
          <div className="UserInfo-name">
            {props.user.name}
          </div>
        </div>
      );
    }
    
    我们的代码就变成了下面这个样子
    function Comment(props) {
      return (
        <div className="Comment">
          <UserInfo user={props.author} />
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }
    
    如果在多个组件中存在重叠的部分，那么不妨吧这些重叠的部分提取成一个独立的组件。
    
   **Props是只读的**
   
    无论你使用function还是使用class来构建组件，请不要修改Props属性。
    下面这个函数叫“纯”函数，它不会修改函数的输入值，只要输入结果相同，输出结果就会相同。
    function sum(a, b) {
      return a + b;
    }
    
    下面这个函数就不是一个“纯”函数，因为它修改了它的输入参数
    function withdraw(account, amount) {
      account.total -= amount;
    }
    
   React是一个灵活的库，但是他有一个严格的规则，那就是所有的React组件必须像
   纯函数一样尊重它的参数。
   
   当然，应用程序的UI是动态的，随着时间变化的。下一节我们将引入一个新的“状态”
   概念，“状态”在不违背这一原则的情况下，使React的组件反应用户的操作、网络
   响应等等的变化。
    
######################################################

>State和生命周期
  
    状态和props非常相似，但是状态是私有的，并且完全受控于组件。
    我们之前提到使用class创建组件的时候会带来一些额外的特性，状态正式这些特性
    之一，只有class创建组件才会附带的特性。
    
   **将function转变成class**
    
      1：使用相同的名字创建一个ES6的class，并 extends React.Component。
      2：添加一个单例的空方法render()到这个class中。
      3：将function定义中的方法体移动到render()方法的方法体中。
      4：将props替换成this.props
      5：删除剩余的空的function声明
      
      class Clock extends React.Component {
        render() {
          return (
            <div>
              <h1>Hello, world!</h1>
              <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
          );
        }
      }
      class定义的组件，让我们拥有了状态和生命周期钩子函数
      
   **添加本地状态到class中**
    
    1：render()中用this.state.date取代this.props.date
    class Clock extends React.Component {
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    2：添加构造函数constructor(),在函数体中分配一个内置的this.state
    class Clock extends React.Component {
      constructor(props) {
        {/* 注意构造函数必须调用父类的构造函数，并传入props属性 */}
        super(props); 
        this.state = {date: new Date()};
      }
    
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    
    3：<Clock />元素中移除date prop
    ReactDOM.render(
      <Clock />,
      document.getElementById('root')
    );
    
    现在整个应用开起来是这样的
    class Clock extends React.Component {
      constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }
    
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    
    ReactDOM.render(
      <Clock />,
      document.getElementById('root')
    );
    
    因为缺少定时器，所以它暂时还不能正常运行
    
   **给一个class添加生命周期函数**
    
    在一个由多个组件构成的应用中，在组件销毁的时候释放资源是非常重要的。
    
    我们希望在Clock组件首次被渲染的时候启动一个定时器。这在React中被称作挂载。
    我们也希望在Clock生成的dom节点被移除的时候销毁这个定时器。这在React中被
    称做卸载。
    
    在组件中我们可以声明一些特殊的方法执行一些代码，当组件挂载或者卸载的时候。
    class Clock extends React.Component {
      constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }
    
      componentDidMount() {
        {/*完成挂载时执行这里的代码*/}
      }
    
      componentWillUnmount() {
        {/*完成卸载时执行这里的代码*/}
      }
    
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    
    这些方法被称为生命周期钩子
    componentDidMount方法在组件返回的元素被渲染到dom之后执行，这正是启动
    定时器的一个地方
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
     注意：这里讲timerID属性附加在了this对象上，而不是this.state对象上。
     如果你需要保存一个不需要展现的数据的时候，就放在this上即可，React不推荐在
     this.state中保存非可视的数据（或者说和render无关的数据）
     
      componentWillUnmount方法会在组件被销毁之前调用，这正是销毁定时器的地方
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
    最后我们将实现tric函数，它将使用this.setState来不断的更新组件的本地状态
    class Clock extends React.Component {
      constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }
    
      componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }
    
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          </div>
        );
      }
    }
    
    ReactDOM.render(
      <Clock />,
      document.getElementById('root')
    );
    
   **正确的使用状态**
    
    注意三点：
      1：不要直接修改状态的属性，而要使用setState()方法
      // Wrong
      this.state.comment = 'Hello';
      
      // Correct
      this.setState({comment: 'Hello'});
      唯一可以给状态复制的地方是构造函数
      2：State可能是异步更新
      为了提高性能，React可能在一次更新中批量的调用setState()方法，所以你不能依
      赖this.State的属性值来计算下一个状态的值
      // Wrong
      this.setState({
        counter: this.state.counter + this.props.increment,
      });
      为了修复这个问题，我们需要让setState接受另第二种形式的参数，第二种形式的
      参数类型是function,而不是一个object. 这个function将接受两个参数：
        第一个参数是上一个状态prevState,第二个参数是更新之后的prop对象。
        // Correct
        this.setState((prevState, props) => ({
          counter: prevState.counter + props.increment
        }));
        
        上面的箭头函数类似
        // Correct
        this.setState(function(prevState, props) {
          return {
            counter: prevState.counter + props.increment
          };
        });
        3：状态更新将被合并
          一个状态中可能含有多个属性，但是每次调用setState(）方法，我们只需要传入
          我们需要更新的属性即可，React将自动将本属性的变化合并到上一个版本的State中。
          
        constructor(props) {
          super(props);
          this.state = {
            posts: [],
            comments: []
          };
        }
       componentDidMount() {
         fetchPosts().then(response => {
           this.setState({
             posts: response.posts
           });
         });
     
         fetchComments().then(response => {
           this.setState({
             comments: response.comments
           });
         });
       }
    
   **向下传递数据**
    
      无论是父组件还是子组件都无法知道一个组件是否拥有状态，他们也不该知道这
      些组件是function 还是 class.
      
      这就是为什么state要作为本地属性或者是封装的原因，状态和任何组件都没有关联
      除非是状态的拥有者。
      
      一个组件通过将它的state属性设置为其子组件的props的方式向下传递数据。
      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    
       用户自定义组件也可以这么传递
       <FormattedDate date={this.state.date} />
       FormattedDate 组件将受到一个props.date属性的值，但是它并不知道这个值是
       来自于Clock的状态还是props，或者是手动写入的一个值
       function FormattedDate(props) {
         return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
       }
    
      这就是普通的单向数据流，任何状态总是由一些特定的组件所拥有，任何数据或者
      UI总是只能够影响它的下部组件（在一个组件树中）。
      
      如果你把一个组件树想象成一个props瀑布，每一个组件的状态就像一个附加的源头，
      在任意地方加入其中，但是只能向下流动。
    
       为了演示组件相对孤立，我们可以创建一个应用，展现三个时钟
       function App() {
         return (
           <div>
             <Clock />
             <Clock />
             <Clock />
           </div>
         );
       }
       
       ReactDOM.render(
         <App />,
         document.getElementById('root')
       );
    
      在React中一个组件是否该拥有状态，应该从它是否需要随着时间的变化而变化的细节思考。
      你可以在一个有状态的组件中引用无状态的组件，也可以再无状态的组件中引用有状态的组件。
      这一切由你决定。

######################################################

>事件处理

    React中的事件处理和普通dom中的事件处理方式相似。
    下面是两点语法上的不同：
      1：React事件的名字使用驼峰命名，而不是小写
      2：在JSX中你要传递一个function给事件，而不是一个字符串
      
      in html
      <button onclick="activateLasers()">
        Activate Lasers
      </button>
      in React:
      <button onClick={activateLasers}>
        Activate Lasers
      </button>
      
      另外一个区别点
        在React中你不能通过return false来组织默认的行为，而需要明确的调用preventDefault
        in html
        <a href="#" onclick="console.log('The link was clicked.'); return false">
          Click me
        </a>
        
        in React
        function ActionLink() {
          function handleClick(e) {
            e.preventDefault();
            console.log('The link was clicked.');
          }
        
          return (
            <a href="#" onClick={handleClick}>
              Click me
            </a>
          );
        }
        这里的e是符合W3C规范的，所以你不必考虑浏览器的兼容性。
        
       React中不能在创建元素之后给元素添加事件通过addEventListener 方法，仅需要在
       元素渲染之前添加事件即可
       
       当你使用ES6 的class定义一个组件的时候，一个常见的模式是将handler定义为该class中的方法
       class Toggle extends React.Component {
         constructor(props) {
           super(props);
           this.state = {isToggleOn: true};
       
           // This binding is necessary to make `this` work in the callback
           //  如果不绑定this,则this是undefined
           this.handleClick = this.handleClick.bind(this);
         }
       
         handleClick() {
           this.setState(prevState => ({
             isToggleOn: !prevState.isToggleOn
           }));
         }
       
         render() {
           return (
             <button onClick={this.handleClick}>
               {this.state.isToggleOn ? 'ON' : 'OFF'}
             </button>
           );
         }
       }
       
       ReactDOM.render(
         <Toggle />,
         document.getElementById('root')
       );
        
        
>条件渲染
      
      if
      
      express && element
      
      express ? a : b
      
      component function return null
      
>列表转换
  
    js中转换一个数组
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map((number) => number * 2);
    console.log(doubled);
    
    渲染多个组件
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li>{number}</li>
    );
  
  
    稍加封装
    function NumberList(props) {
      const numbers = props.numbers;
      const listItems = numbers.map((number) =>
        <li>{number}</li>
      );
      return (
        <ul>{listItems}</ul>
      );
    }
    
    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
      <NumberList numbers={numbers} />,
      document.getElementById('root')
    );
    
    但是你会收到一个警告，说li标签中缺少一个key属性
    key用来辅助React标记元素，以便其增加、删除等操作，通常应该给定一个不重复的字符串
    比如ID,当没有这个稳定的id时，可以使用index。如果有id,不推荐使用index
    
    通常循环生成元素的时候才需要一个key，否则不需要指定key
    key的值在兄弟节点之间不能重复
    
>表单

    html的form表单和React的form略有不同，html的表单带有一些原生的属性和状态，如提交的时候
    自动跳转到某个页面。如果你希望它在React中有这个特性，他也能照常工作。但是很多情况下，有一个
    JavaScript的function来访问胡处理form表单的数据会更加方便，实现这一功能的标准方法是给这个组件
    添加控制组件
  
    html中，form的元素 如 input,textarea，select都是各自维护自己的状态。但是在React中这个状态只存在
    于组件中，而且只能通过setState()方法更新
  
    我们可以联合这两者，是React的state成为状态的唯一来源。这样React的组件能够控制用户后续对表单的操作
    通过这种方式，一个form的input元素，它的值将由React的组件控制，这叫做控制组件
  
    下面就是一个例子
  
    class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = { value: ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      handleChange(event) {
        this.setState({value: event.target.value});
      }
      
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
      
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
  
    普通的html中textarea标签的内容有其子元素决定，在React中它的值由它的属性value决定
    textarea标签的处理方式和input如出一辙
    
    select标签
      一个普通的下俩选择标签，可以在option中指定selected属性指定默认值
      <select>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option selected value="coconut">Coconut</option>
        <option value="mango">Mango</option>
      </select>
      但是在React中指定默认值的方式和上面不同，而是在select中指定一个value属性来指定默认值
      class FlavorForm extends React.Component {
        constructor(props) {
          super(props);
          this.state = {value: 'coconut'};
      
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }
      
        handleChange(event) {
          this.setState({value: event.target.value});
        }
      
        handleSubmit(event) {
          alert('Your favorite flavor is: ' + this.state.value);
          event.preventDefault();
        }
      
        render() {
          return (
            <form onSubmit={this.handleSubmit}>
              <label>
                Pick your favorite La Croix flavor:
                <select value={this.state.value} onChange={this.handleChange}>
                  <option value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option value="coconut">Coconut</option>
                  <option value="mango">Mango</option>
                </select>
              </label>
              <input type="submit" value="Submit" />
            </form>
          );
        }
      }
      
      尽管使用控制组件的方式可以让代码非常的明确，但是操作起来有些过于繁琐，
      由于需要为每个输入编写handler，让人感觉很讨厌，可以尝试用
      Uncontrolled Components，高级用法里面会有介绍
      
>组件之间共享数据
    
    通常多个组件写作的情况下需要共享状态，那么这个时候我们推荐将共享的状态提升
    到距离这些组件最近的共同祖先节点。
    
    下面是一个温度计算器，它接受一个摄氏温度作为参数，然后打印是否足够让谁沸腾
    
    function BoilingVerdict(props) {
      if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
      }
      return <p>The water would not boil.</p>;
    }
    
    
    class Calculator extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: ''};
      }
    
      handleChange(e) {
        this.setState({value: e.target.value});
      }
    
      render() {
        const value = this.state.value;
        return (
          <fieldset>
            <legend>Enter temperature in Celsius:</legend>
            <input
              value={value}
              onChange={this.handleChange} />
            <BoilingVerdict
              celsius={parseFloat(value)} />
          </fieldset>
        );
      }
    }
      
    需求发生变化，我们现在需要添加第二个输入域，来接受华氏温度，并保持摄氏温度和华氏温度同步变化
    
    我们从计算器中提取出一个TemperatureInput 组件
    const scaleNames = {
      c: 'Celsius',
      f: 'Fahrenheit'
    };
    const scaleNames = {
      c: 'Celsius',
      f: 'Fahrenheit'
    };
    
    class TemperatureInput extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: ''};
      }
    
      handleChange(e) {
        this.setState({value: e.target.value});
      }
    
      render() {
        const value = this.state.value;
        const scale = this.props.scale;
        return (
          <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={value}
                   onChange={this.handleChange} />
          </fieldset>
        );
      }
    }

    计算器的代码变成下面的样子
    class Calculator extends React.Component {
      render() {
        return (
          <div>
            <TemperatureInput scale="c" />
            <TemperatureInput scale="f" />
          </div>
        );
      }
    }
    
    现在我有两个输入域，但是他们并没有保持同步，违背了需求。
    我们也不能展现温度，因为计算器并不知道当前的温度是多少
    
   提升State到他们的共同祖先组件中
    
      首先我们要编写两个转换函数，实现华氏温度和摄氏温度相互转换的功能
      function toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
      }
      
      function toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
      }
      
      我们还需要编写另一个函数，接受一个字符串和一个function作为参数，返回一个字符串，
      用来基于一个输入域的值计算另一个输入域的值，校验输入的 值，然后保证返回三个小数位
      function tryConvert(value, convert) {
        const input = parseFloat(value);
        if (Number.isNaN(input)) {
          return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
      }
      
      下面我们将从TemperatureInput中移除State
      然后我们用this.props来接受value和onChange
      class TemperatureInput extends React.Component {
        constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
        }
      
        handleChange(e) {
          this.props.onChange(e.target.value);
        }
      
        render() {
          const value = this.props.value;
          const scale = this.props.scale;
          return (
            <fieldset>
              <legend>Enter temperature in {scaleNames[scale]}:</legend>
              <input value={value}
                     onChange={this.handleChange} />
            </fieldset>
          );
        }
      }
      
      
      提升State之后的Calculator 代码是这样的
      class Calculator extends React.Component {
        constructor(props) {
          super(props);
          this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
          this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
          this.state = {value: '', scale: 'c'};
        }
      
        handleCelsiusChange(value) {
          this.setState({scale: 'c', value});
        }
      
        handleFahrenheitChange(value) {
          this.setState({scale: 'f', value});
        }
      
        render() {
          const scale = this.state.scale;
          const value = this.state.value;
          const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
          const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;
      
          return (
            <div>
              <TemperatureInput
                scale="c"
                value={celsius}
                onChange={this.handleCelsiusChange} />
              <TemperatureInput
                scale="f"
                value={fahrenheit}
                onChange={this.handleFahrenheitChange} />
              <BoilingVerdict
                celsius={parseFloat(celsius)} />
            </div>
          );
        }
      }
      
      
>组合 vs 继承
    
    React有一个非常强大的组合模型，在代码重用方面，我们强烈推荐使用组合，不
    推荐使用继承。
    
    本节我们将讨论一些，React入门级新手常常遇到的问题，并展示我们如何用组合
    来处理这些问题
    
    一些组件，事先不清楚他们的子节点。这对Sidebar/Dialog之类的容器类的组件很
    常见。
    
    我们推荐这类组件使用特殊的children prop来直接传递子元素。
    function FancyBorder(props) {
      return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
          {props.children}
        </div>
      );
    }
    
    这使得在JSX中其他的组件可以传递任意的子节点给这些子节点
    function WelcomeDialog() {
      return (
        <FancyBorder color="blue">
          <h1 className="Dialog-title">
            Welcome
          </h1>
          <p className="Dialog-message">
            Thank you for visiting our spacecraft!
          </p>
        </FancyBorder>
      );
    }
    
    所有嵌套在FancyBorder标签中的组件都将作为他的一个children prop。
    
    经管这不是很常用，但是有很多时候你需要更多的接入点。这种情况下，你可能提
    你自己的方式，而不是使用children。
    function SplitPane(props) {
      return (
        <div className="SplitPane">
          <div className="SplitPane-left">
            {props.left}
          </div>
          <div className="SplitPane-right">
            {props.right}
          </div>
        </div>
      );
    }
    
    function App() {
      return (
        <SplitPane
          left={
            <Contacts />
          }
          right={
            <Chat />
          } />
      );
    }
    
    看到上面的代码中，<Concats /> 和 <Chat />只是一个object，所以你可以向传递
    任何其他数据一样传递他们。
    
    有时我们会考虑到一些特殊情况，如WelcomeDialog就是Dialog的一个特例。这
    也可以通过组合来处理，一个特例的组件渲染出一个更加通用的配置。
    
    function Dialog(props) {
      return (
        <FancyBorder color="blue">
          <h1 className="Dialog-title">
            {props.title}
          </h1>
          <p className="Dialog-message">
            {props.message}
          </p>
        </FancyBorder>
      );
    }
    
    function WelcomeDialog() {
      return (
        <Dialog
          title="Welcome"
          message="Thank you for visiting our spacecraft!" />
      );
    }
    
    通过class来定义的组件使用组合也是非常方便的
    function Dialog(props) {
      return (
        <FancyBorder color="blue">
          <h1 className="Dialog-title">
            {props.title}
          </h1>
          <p className="Dialog-message">
            {props.message}
          </p>
          {props.children}
        </FancyBorder>
      );
    }
    
    class SignUpDialog extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
      }
    
      render() {
        return (
          <Dialog title="Mars Exploration Program"
                  message="How should we refer to you?">
            <input value={this.state.login}
                   onChange={this.handleChange} />
            <button onClick={this.handleSignUp}>
              Sign Me Up!
            </button>
          </Dialog>
        );
      }
    
      handleChange(e) {
        this.setState({login: e.target.value});
      }
    
      handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
      }
    }

    在Facebook中，成千上万的组件，没有找到继承的用例，Props和组合给你带来了
    组合组件的很多便利。你始终要基础通过Props可以传递任何你想要传递的参数，包括
    原始数值，React 元素，或者是一个function

     如果你希望重用一个非UI的功能，我们推荐使用 import 导入这个功能，而非继承。
     
>React 的思考

    按照什么标准来决定是否该将某一块内容定义成一个组件：单一责任制原则
    
    根据划分来定义应用的层次结构
      FilterableProductTable
          SearchBar
          ProductTable
              ProductCategoryRow
              ProductRow
    大概的结构就是这样了
    
    下面开始构建这个应用
    html部分
    <div id="container">
      <!-- This element's contents will be replaced with your component. -->
    </div>
    
    css部分
    body{
      padding: 5px;
    }
    
    Babel部分
    class ProductCategoryRow extend React.Component {
      render() {
        return (
          <tr><th colSpan="2">{ this.props.category }</th></tr>
        )
      }
    }
    
    class ProductCategoryRow extend React.Component {
      render() {
        var name = this.props.product.stocked 
        ?
        this.props.product.name
        :
        <span style={{ color: 'red' }}>
          { this.props.product.name }
        </span>;
          
        return(
          <tr>
            <td>{ name }</td>
            <td>{ this.props.product.price }</td>
          </tr>
        )
      };
    }
    
    class ProductTable extends React.Component {
      render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
          if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
          }
          rows.push(<ProductRow product={product} key={product.name} />);
          lastCategory = product.category;
        });
        return (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        );
      }
    }
    
    class SearchBar extends React.Component {
      render() {
        return (
          <form>
            <input type="text" placeholder="Search..." />
            <p>
              <input type="checkbox" />
              {' '}
              Only show products in stock
            </p>
          </form>
        );
      }
    }
    
    class FilterableProductTable extends React.Component {
      render() {
        return (
          <div>
            <SearchBar />
            <ProductTable products={this.props.products} />
          </div>
        );
      }
    }
    
    var PRODUCTS = [
      {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
      {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
      {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
      {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
      {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
      {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
    ];
    
    
    ReactDOM.render(
      <FilterableProductTable products={PRODUCTS} />,
      document.getElementById('container')
    );
    
    注意这里的构建顺序，由小到大。由于是一个静态的构建过程，所以不需要考虑交互性。
    如果你熟悉State，你会发现这里没有用到State，State是为了交互性而生的。这里
    的数据流都是父组件单向的传递给子组件，所以不需要State.
    
    关于构建顺序，由大到小或者由小到大其实差不多，你自己决定。通常编写小的项目
    都是由大到小，编写大的项目都是由小到大。
    
    上面的例子只不过是一个静态模型，通常构建应用的时候，首先应该完成静态模型的
    建设，然后在此基础上实现组件之间的交互效果。
    
    下面开始实现交互效果
    实现交互效果的第一步是找到变化状态的最小集合
    
    我们的数据
      1：原始的产品列表
      2：用户输入的关键字
      3：复选框
      4：过滤之后的产品列表
      
     关于这些数据，思考三个问题：
      1：是否由父组件通过prop属性传入的？ 如果是，那么它不属于State
      2：它是否随着时间变化？ 如果不变，那么它不属于State
      3：你是否可以通过其他的State属性或者你组件内部的Props计算出它？ 如果是，
          那么它不属于State
          
      ·原始的产品列表时通过props传递的，所以它不属于State；
      ·用户输入的关键字和复选框看起来像State的属性，因为它会随着时间变化，并且
      使用其他的State和组件内部的Props无法计算出它的值
      ·过滤之后的数据可以通过原始产品列表；以及用户输入的关键字、复选框等数据
      计算出来，所以它也不属于State.
      
      最后我们得出结果，用户输入的值和复选框的值会作为State的属性。
      
      下一步就是确定你的State将住在哪里？ 
      
      由于React是单向数据流，即单向数据绑定。所以可能无法马上明确哪个组件由什么状态。
      这对React新手来说是一个很有挑战性的部分。
      
      所以接下来的步骤让我们搞定这一切。
      
      针对你的应用中的所有碎片：
        1：找到所有渲染这些状态的组件；
        2：找到一个第一步组件结果的共同的父组件；
        3：或者是2中找到的组件，或者另一个层级关系比较高的组件应该拥有这个状态
        4：如果你不能找到一个拥有这个state的组件，那么就为了共享State需要新创建
        一个组件，并把它添加在共同拥有者的上层的合适位置。
        
       结合我们的应用程序：
        ProductTable 需要基于State过滤产品列表，SearchBar 需要展现用户的输入和复选框
        这两个组件的共同祖先是FilterableProductTable
        
        所以我们就让状态入住FilterableProductTable。首先在构造方法中添加实例属性
        this.state = {filterText: '', inStockOnly: false} ，然后通过Props将filterText和
        inStockOnly传递给ProductTable 和 SearchBar ，最后使用传递进来的值在
        ProductTable 中实现产品过滤；
        
        
        class ProductCategoryRow extends React.Component {
          render() {
            return (<tr><th colSpan="2">{this.props.category}</th></tr>);
          }
        }
        
        class ProductRow extends React.Component {
          render() {
            var name = this.props.product.stocked ?
              this.props.product.name :
              <span style={{color: 'red'}}>
                {this.props.product.name}
              </span>;
            return (
              <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
              </tr>
            );
          }
        }
        
        class ProductTable extends React.Component {
          render() {
            var rows = [];
            var lastCategory = null;
            //这段代码就是过滤
            this.props.products.forEach((product) => {
              if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
              }
              if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
              }
              rows.push(<ProductRow product={product} key={product.name} />);
              lastCategory = product.category;
            });
            return (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            );
          }
        }
        
        class SearchBar extends React.Component {
          constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
          }
          
          handleChange() {
            this.props.onUserInput(
              this.filterTextInput.value,
              this.inStockOnlyInput.checked
            );
          }
          
          render() {
            return (
              <form>
                <input
                  type="text"
                  placeholder="Search..."
                  value={this.props.filterText}
                  ref={(input) => this.filterTextInput = input}
                  onChange={this.handleChange}
                />
                <p>
                  <input
                    type="checkbox"
                    checked={this.props.inStockOnly}
                    ref={(input) => this.inStockOnlyInput = input}
                    onChange={this.handleChange}
                  />
                  {' '}
                  Only show products in stock
                </p>
              </form>
            );
          }
        }
        
        class FilterableProductTable extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              filterText: '',
              inStockOnly: false
            };
            
            this.handleUserInput = this.handleUserInput.bind(this);
          }
        
          handleUserInput(filterText, inStockOnly) {
            this.setState({
              filterText: filterText,
              inStockOnly: inStockOnly
            });
          }
        
          render() {
            return (
              <div>
                <SearchBar
                  filterText={this.state.filterText}
                  inStockOnly={this.state.inStockOnly}
                  onUserInput={this.handleUserInput}
                />
                <ProductTable
                  products={this.props.products}
                  filterText={this.state.filterText}
                  inStockOnly={this.state.inStockOnly}
                />
              </div>
            );
          }
        }
        
        
        var PRODUCTS = [
          {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
          {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
          {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
          {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
          {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
          {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
        ];
        
        ReactDOM.render(
          <FilterableProductTable products={PRODUCTS} />,
          document.getElementById('container')
        );
      
      说的再明确一点就是父组件给子组件传递了一个回调函数，在子组件的某个事件
      发生的时候触发了这个回调函数，回调函数中使用了setState()修改了State的值，
      从而又激发了React中的单向数据传递，导致了其子组件的变化。
      
      听起来有些复杂，说白了也就是几行代码。这样就实现了双向数据绑定
      
      
      入门教程到此结束
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

>高级教程

  **深入学习JSX**
  
    从根本上来说JSX仅仅为React.createElement( component, props, ...children )提
    供了一个语法糖功能。
    
      jsx的代码
        <MyButton color="blue" shadowSize={2}>
          Click Me
        </MyButton>
      翻译成React的代码
        React.createElement(
          MyButton,
          {color: 'blue', shadowSize: 2},
          'Click Me'
        )
        
      如果没有子节点，在jsx中你可用自关闭的标签
        <div className="sidebar" />
      对应的React代码是
        React.createElement(
          'div',
          {className: 'sidebar'},
          null
        )
        
  **类型检查**
        
        class Greeting extends React.Component {
          render() {
            return (
              <h1>Hello, {this.props.name}</h1>
            );
          }
        }
        
        Greeting.propTypes = {
          name: React.PropTypes.string
        };
     
        如果类型校验失败，会在控制台收到一个警告信息。只是在开发模式下起作用。
        下面是各种校验的写法
        MyComponent.propTypes = {
          // You can declare that a prop is a specific JS primitive. By default, these
          // are all optional.
          optionalArray: React.PropTypes.array,
          optionalBool: React.PropTypes.bool,
          optionalFunc: React.PropTypes.func,
          optionalNumber: React.PropTypes.number,
          optionalObject: React.PropTypes.object,
          optionalString: React.PropTypes.string,
          optionalSymbol: React.PropTypes.symbol,
        
          // Anything that can be rendered: numbers, strings, elements or an array
          // (or fragment) containing these types.
          optionalNode: React.PropTypes.node,
        
          // A React element.
          optionalElement: React.PropTypes.element,
        
          // You can also declare that a prop is an instance of a class. This uses
          // JS's instanceof operator.
          optionalMessage: React.PropTypes.instanceOf(Message),
        
          // You can ensure that your prop is limited to specific values by treating
          // it as an enum.
          optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
        
          // An object that could be one of many types
          optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.instanceOf(Message)
          ]),
        
          // An array of a certain type
          optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
        
          // An object with property values of a certain type
          optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
        
          // An object taking on a particular shape
          optionalObjectWithShape: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
          }),
        
          // You can chain any of the above with `isRequired` to make sure a warning
          // is shown if the prop isn't provided.
          requiredFunc: React.PropTypes.func.isRequired,
        
          // A value of any data type
          requiredAny: React.PropTypes.any.isRequired,
        
          // You can also specify a custom validator. It should return an Error
          // object if the validation fails. Don't `console.warn` or throw, as this
          // won't work inside `oneOfType`.
          customProp: function(props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
              return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
              );
            }
          },
        
          // You can also supply a custom validator to `arrayOf` and `objectOf`.
          // It should return an Error object if the validation fails. The validator
          // will be called for each key in the array or object. The first two
          // arguments of the validator are the array or object itself, and the
          // current item's key.
          customArrayProp: React.PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
            if (!/matchme/.test(propValue[key])) {
              return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
              );
            }
          })
        };
      
        定义默认值
        class Greeting extends React.Component {
          render() {
            return (
              <h1>Hello, {this.props.name}</h1>
            );
          }
        }
        
        // Specifies the default values for props:
        Greeting.defaultProps = {
          name: 'Stranger'
        };
        
        // Renders "Hello, Stranger":
        ReactDOM.render(
          <Greeting />,
          document.getElementById('example')
        );
        
        有且自由一个子节点
        class MyComponent extends React.Component {
          render() {
            // This must be exactly one element or it will warn.
            const children = this.props.children;
            return (
              <div>
                {children}
              </div>
            );
          }
        }
        
        MyComponent.propTypes = {
          children: React.PropTypes.element.isRequired
        };


   **ref 回调属性**
   
       React有一个可以附加到任何元素上的属性：ref。这个属性附带了一个回调函数，
       这个回调函数在组件完成挂载或者卸载之后都会执行。
       
       class CustomTextInput extends React.Component {
         constructor(props) {
           super(props);
           this.focus = this.focus.bind(this);
         }
       
         focus() {
           // Explicitly focus the text input using the raw DOM API
           this.textInput.focus();
         }
       
         render() {
           // Use the `ref` callback to store a reference to the text input DOM
           // element in this.textInput.
           return (
             <div>
               <input
                 type="text"
                 ref={(input) => { this.textInput = input; }} />
               <input
                 type="button"
                 value="Focus the text input"
                 onClick={this.focus}
               />
             </div>
           );
         }
       }
       
       挂载的时候将本节点的潜在DOM作为参数，传入回调函数；卸载的时候将null作
       为参数传入回调函数。
       
       
       不要过度使用这个ref属性。
       
   **非控制组件**
  
       大多情况下，我们推荐使用控制组件实现form表单。控制组件中form data由组
       件进行控制，非控制组件中form data由dom自己控制。
       
       为了编写一个非控制组件，我们可以使用ref属性。
       class NameForm extends React.Component {
         constructor(props) {
           super(props);
           this.handleSubmit = this.handleSubmit.bind(this);
         }
       
         handleSubmit(event) {
           alert('A name was submitted: ' + this.input.value);
           event.preventDefault();
         }
       
         render() {
           return (
             <form onSubmit={this.handleSubmit}>
               <label>
                 Name:
                 <input type="text" ref={(input) => this.input = input} />
               </label>
               <input type="submit" value="Submit" />
             </form>
           );
         }
       }
       
       
       使用非控制组件会加快你的开发速度，但是你写的代码也比较糙。换句话说，你
       不该经常使用非控制组件。
       
       在什么情况下需要使用非控制组件请参看：
       http://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
       
       非控制组件指定默认值
       render() {
         return (
           <form onSubmit={this.handleSubmit}>
             <label>
               Name:
               <input
                 defaultValue="Bob"
                 type="text"
                 ref={(input) => this.input = input} />
             </label>
             <input type="submit" value="Submit" />
           </form>
         );
       }
       
       需要说明的是
       Likewise, <input type="checkbox"> and <input type="radio"> support defaultChecked, 
       and <select> supports defaultValue.
  
  
++++++++++++++++++++++++++++++++++++++++++++++++++
下面的这些内容，初学者可以不用关注，这里不再详细说明

  **最佳性能**
  **消除ES6**
  **消除JSX**
  **DIFF算法**
  **上下文**
  **WEB组件**
  **更高层次的组件**
  
  material-ui的帮助文档：
  http://www.material-ui.com/#/
