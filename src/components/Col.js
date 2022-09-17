import React from 'react'

function Col(props) {
    return (
        <>
            <div className={props.className}>
                {props.children}
            </div>
        </>
      )
}

export default Col