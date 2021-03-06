import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import NoMatch from "./nomatch"
export default () => Component => {
	function RequiresLogin(props) {
		const { authenticating, loggedIn, error, userName, match, ...passThroughProps } = props
		console.log(match.params)
		if (authenticating) {
			return <div>Logging in...</div>
		} else if (!loggedIn || error) {
			return <Redirect to="/" />
		}
		if (userName && userName !== match.params.id) {
			return <NoMatch />
		}
		return <Component {...passThroughProps} />
	}

	const displayName = Component.displayName || Component.name || "Component"
	RequiresLogin.displayName = `RequiresLogin(${displayName})`

	const mapStateToProps = (state, props) => ({
		authenticating: state.auth.loading,
		loggedIn: state.auth.currentUser !== null,
		error: state.auth.error,
		userName: state.auth.currentUser ? state.auth.currentUser.userName : null
	})
	return connect(mapStateToProps)(RequiresLogin)
}
