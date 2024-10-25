
const MiniReact = {
  createElement: (type, props, ...children) => {
    console.log(111111111111)
    return {
      type,
      props: {
        ...props,
        children: children.map(child => {
          if (typeof child === 'object') {
            return child
          }
          return {
            type: 'TEXT_ELEMENT',
            props: {
              nodeValue: child,
              children: []
            }
          }
        })
      }
    }
  },
  render
}
function render (element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)
  const isProperty = key => key !== 'children'
  Object.keys(element.props).filter(isProperty).forEach(name => {
    dom[name] = element.props[name]
  })
  element.props.children.forEach(child => render(child, dom))
  container.appendChild(dom)
}
export default MiniReact