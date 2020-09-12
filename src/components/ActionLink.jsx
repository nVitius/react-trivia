import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class ActionLink extends React.Component {
  onClick(e) {
    const { history, location, action, replace, to } = this.props
    if (location.pathname === to || e.defaultPrevented)
      return

    e.preventDefault()

    Promise.resolve(action())
      .then(() =>
        replace
          ? history.replace(to)
          : history.push(to)
      )
  }

  render() {
    const props = Object.assign({}, this.props)
    delete props.action
    delete props.replace
    delete props.staticContext // Some `withRouter` side-effect

    return <Link {...props} onClick={e => this.onClick(e)} />
  }
}

ActionLink.propTypes = {
  action: PropTypes.func,
  replace: PropTypes.bool,
  to: PropTypes.string
}

ActionLink.defaultProps = {
  replace: false,
  action: () => {}
}

export default withRouter(ActionLink)
