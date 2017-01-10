本文记录学习react的脚印

React是一个用来构建用户界面的库
  三大特征：
    声明式
    基于组件
    一次学习，到处编写
  
  一个简单的组件：
    React的组件实现了一个render()函数，这个函数入参是数据，返回的是展现内容，下面的例子用的是一种类XML的语法（JSX）
    输入到render()函数的参数，可以通过this.props的方式访问。
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
    
  一个有状态的组件
    除了可以通过this.props来访问外部传入的数据，一个组件还可以通过this.state维护内部状态数据。当一个组件的状态数据发生变化，
    已经渲染的标签将会通过调用render()被重新渲染。
    {/* 下面是一个记录时间的组件 */}
    class Timer extends React.Component {
      {/* 这是es6的语法，constructor是构造函数的意思，构造函数内部首先要执行super()来调用父类的构造函数 */}
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
